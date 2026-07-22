/**
 * app.js — PlateVision Dashboard
 *
 * Responsibilities:
 *  - Upload images with XHR progress feedback
 *  - Poll job status every 2s until completed/failed
 *  - Render jobs table with live status badges and image thumbnails
 *  - Open side panel with full analysis results and high-res image
 *  - Display Gemini-extracted number plate or "Not Found" badge
 *  - Toast notifications for key events
 *  - STRICTLY NO EMOJIS — Bootstrap Icons only
 */

'use strict';

/* ─── Config ──────────────────────────────────────────────────────────── */
// Auto-detect: local dev uses relative URL, GitHub Pages uses Render backend
const API_BASE        = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? ''
  : 'https://platevision-api.onrender.com';
const POLL_INTERVAL   = 2000;   // ms between status polls
const REFRESH_INTERVAL= 8000;   // ms between full job list refreshes
const MAX_FILENAME_LEN= 24;

/* ─── State ───────────────────────────────────────────────────────────── */
const pollingMap = new Map();   // job_id → intervalId
let   allJobs    = [];
let   activePanelJobId = null;

/* ─── DOM Refs ────────────────────────────────────────────────────────── */
const uploadZone    = document.getElementById('upload-zone');
const fileInput     = document.getElementById('file-input');
const browseBtn     = document.getElementById('browse-btn');
const uploadProg    = document.getElementById('upload-progress');
const progFill      = document.getElementById('progress-fill');
const progPct       = document.getElementById('progress-pct');
const progLabel     = document.getElementById('progress-label-text');
const emptyState    = document.getElementById('empty-state');
const jobsTable     = document.getElementById('jobs-table');
const jobsTbody     = document.getElementById('jobs-tbody');
const badgeCount    = document.getElementById('badge-count');
const jobsCount     = document.getElementById('jobs-count');
const queueDepth    = document.getElementById('queue-depth');
const apiStatusEl   = document.getElementById('api-status');
const apiStatusText = document.getElementById('api-status-text');
const resultsPanel  = document.getElementById('results-panel');
const panelOverlay  = document.getElementById('panel-overlay');
const panelClose    = document.getElementById('panel-close');
const panelTitle    = document.getElementById('panel-title');
const panelBody     = document.getElementById('panel-body');

/* ─── Utilities ───────────────────────────────────────────────────────── */

function truncate(str, n) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n - 3) + '…' : str;
}

function formatBytes(b) {
  if (!b) return '—';
  if (b < 1024)        return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / (1024 * 1024)).toFixed(1) + ' MB';
}

function timeAgo(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const s  = Math.floor(ms / 1000);
  if (s < 5)    return 'just now';
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  return `${Math.floor(s/3600)}h ago`;
}

function fmt(n) { return (n || 0) + ' ms'; }

/* ─── Toast ───────────────────────────────────────────────────────────── */

function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = {
    success: '<i class="bi bi-check-circle-fill" style="color:var(--success)"></i>',
    error:   '<i class="bi bi-x-circle-fill" style="color:var(--error)"></i>',
    warning: '<i class="bi bi-exclamation-triangle-fill" style="color:var(--warning)"></i>',
    info:    '<i class="bi bi-info-circle-fill" style="color:var(--info)"></i>'
  };
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

/* ─── API ─────────────────────────────────────────────────────────────── */

async function apiFetch(path, options = {}) {
  const res = await fetch(API_BASE + path, options);
  if (!res.ok && res.status !== 202) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `HTTP ${res.status}`);
  }
  return res.json().catch(() => null);
}

/* ─── Health Check ────────────────────────────────────────────────────── */

async function checkHealth() {
  try {
    const data = await apiFetch('/api/health');
    apiStatusText.textContent = data.gemini_configured ? 'API Online · Gemini Active' : 'API Online · Gemini Off';
    apiStatusEl.querySelector('.stat-dot').style.background = 'var(--success)';
    queueDepth.textContent = data.queue_depth ?? 0;
  } catch {
    apiStatusText.textContent = 'API Offline';
    apiStatusEl.querySelector('.stat-dot').style.background = 'var(--error)';
  }
}

/* ─── Upload ──────────────────────────────────────────────────────────── */

function handleFiles(files) {
  const file = files[0];
  if (!file) return;

  const allowedTypes = ['image/jpeg','image/png','image/webp','image/bmp','image/tiff'];
  if (!allowedTypes.includes(file.type)) {
    showToast(`Unsupported format: ${file.type}`, 'error');
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    showToast('File exceeds 20 MB limit.', 'error');
    return;
  }
  uploadFile(file);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  uploadProg.classList.add('visible');
  progFill.style.width = '0%';
  progPct.textContent  = '0%';
  progLabel.textContent = `Uploading ${truncate(file.name, 24)}…`;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${API_BASE}/api/upload`);

  xhr.upload.addEventListener('progress', e => {
    if (e.lengthComputable) {
      const pct = Math.round(e.loaded / e.total * 100);
      progFill.style.width = pct + '%';
      progPct.textContent  = pct + '%';
    }
  });

  xhr.addEventListener('load', () => {
    uploadProg.classList.remove('visible');
    if (xhr.status === 202) {
      const data = JSON.parse(xhr.responseText);
      showToast(`Uploaded! Job ID: ${data.job_id.slice(0,8)}…`, 'success');
      startPolling(data.job_id);
      refreshJobs();
    } else {
      const err = JSON.parse(xhr.responseText || '{}');
      showToast(`Upload failed: ${err.detail || xhr.status}`, 'error');
    }
  });

  xhr.addEventListener('error', () => {
    uploadProg.classList.remove('visible');
    showToast('Network error during upload. Is the server running?', 'error');
  });

  xhr.send(formData);
}

/* ─── Drag & Drop ─────────────────────────────────────────────────────── */

uploadZone.addEventListener('dragover', e => {
  e.preventDefault();
  uploadZone.classList.add('drag-over');
});

uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));

uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  handleFiles(e.dataTransfer.files);
});

uploadZone.addEventListener('click', e => {
  if (e.target === browseBtn || browseBtn.contains(e.target)) return;
  fileInput.click();
});

browseBtn.addEventListener('click', e => {
  e.stopPropagation();
  fileInput.click();
});

uploadZone.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') fileInput.click();
});

fileInput.addEventListener('change', e => handleFiles(e.target.files));

/* ─── Polling ─────────────────────────────────────────────────────────── */

function startPolling(jobId) {
  if (pollingMap.has(jobId)) return;
  const intervalId = setInterval(async () => {
    try {
      const job = await apiFetch(`/api/status/${jobId}`);
      updateJobInList(job);
      if (job.status === 'completed' || job.status === 'failed') {
        clearInterval(intervalId);
        pollingMap.delete(jobId);

        if (job.status === 'completed') {
          showToast(`Job ${jobId.slice(0,8)}… completed!`, 'success');
          // Refresh full results (polling endpoint strips results)
          const fullJob = await apiFetch(`/api/results/${jobId}`).catch(() => job);
          updateJobInList(fullJob);
          // Auto-open results panel if no panel is currently open
          if (!activePanelJobId) openPanel(fullJob);
        } else {
          showToast(`Job ${jobId.slice(0,8)}… failed.`, 'error');
        }
        refreshJobs();
      }
    } catch (e) {
      console.warn('Poll error:', e);
    }
  }, POLL_INTERVAL);
  pollingMap.set(jobId, intervalId);
}

/* ─── Jobs List ───────────────────────────────────────────────────────── */

async function refreshJobs() {
  try {
    const data = await apiFetch('/api/jobs?limit=50');
    if (!data) return;
    allJobs = data.jobs || [];
    renderJobsTable(allJobs);
    jobsCount.textContent = data.total ?? allJobs.length;
    badgeCount.textContent = allJobs.length;

    // Resume polling for any in-progress jobs (e.g. after page reload)
    allJobs.forEach(job => {
      if ((job.status === 'pending' || job.status === 'processing') && !pollingMap.has(job.id)) {
        startPolling(job.id);
      }
    });
  } catch (e) {
    console.warn('refreshJobs error:', e);
  }
}

function updateJobInList(job) {
  const idx = allJobs.findIndex(j => j.id === job.id);
  if (idx >= 0) allJobs[idx] = job;
  else allJobs.unshift(job);
  renderJobsTable(allJobs);
  badgeCount.textContent = allJobs.length;

  // Update open panel if it's for this job
  if (activePanelJobId === job.id && job.results) {
    renderPanelContent(job);
  }
}

function renderJobsTable(jobs) {
  if (!jobs || jobs.length === 0) {
    emptyState.style.display = '';
    jobsTable.style.display = 'none';
    return;
  }
  emptyState.style.display = 'none';
  jobsTable.style.display = '';

  jobsTbody.innerHTML = '';
  jobs.forEach(job => {
    const tr = document.createElement('tr');
    if (activePanelJobId === job.id) tr.classList.add('active-row');
    tr.dataset.jobId = job.id;

    const imgPreview = job.filename 
      ? `<img src="/uploads/${escHtml(job.filename)}" class="thumb-preview" alt="Preview" />`
      : '<div class="thumb-preview" style="display:flex;align-items:center;justify-content:center;"><i class="bi bi-image"></i></div>';

    const plate = job.plate_text || job.results?.plate_text;
    const plateHtml = plate 
      ? `<span style="font-family:'JetBrains Mono',monospace;color:var(--teal);font-weight:600;"><i class="bi bi-car-front-fill"></i> ${escHtml(plate)}</span>` 
      : `<span class="plate-not-found"><i class="bi bi-slash-circle"></i> Not Found</span>`;

    const age   = timeAgo(job.updated_at || job.created_at);
    const size  = formatBytes(job.file_size);

    tr.innerHTML = `
      <td>${imgPreview}</td>
      <td class="filename" title="${escHtml(job.original_filename)}">
        ${escHtml(truncate(job.original_filename, MAX_FILENAME_LEN))}
      </td>
      <td><span class="status-badge ${job.status}">${job.status}</span></td>
      <td>${size}</td>
      <td class="mono">${age}</td>
      <td>${plateHtml}</td>
    `;

    tr.addEventListener('click', () => {
      if (job.status === 'completed' || job.status === 'failed') {
        apiFetch(`/api/results/${job.id}`)
          .then(full => openPanel(full || job))
          .catch(() => openPanel(job));
      } else {
        showToast(`Job is ${job.status}. Results available once completed.`, 'info', 3000);
      }
    });

    jobsTbody.appendChild(tr);
  });
}

function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── Results Panel ───────────────────────────────────────────────────── */

function openPanel(job) {
  activePanelJobId = job.id;
  panelTitle.textContent = truncate(job.original_filename, 30) || 'Analysis Results';
  renderPanelContent(job);
  resultsPanel.classList.add('open');
  panelOverlay.classList.add('active');
  // Mark active row
  document.querySelectorAll('#jobs-tbody tr').forEach(tr => {
    tr.classList.toggle('active-row', tr.dataset.jobId === job.id);
  });
}

function closePanel() {
  activePanelJobId = null;
  resultsPanel.classList.remove('open');
  panelOverlay.classList.remove('active');
  document.querySelectorAll('#jobs-tbody tr').forEach(tr => tr.classList.remove('active-row'));
}

panelClose.addEventListener('click', closePanel);
panelOverlay.addEventListener('click', closePanel);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && activePanelJobId) closePanel();
});

function renderPanelContent(job) {
  if (!job) { panelBody.innerHTML = '<p style="color:var(--text-muted);padding:20px">No data.</p>'; return; }

  if (job.status === 'pending' || job.status === 'processing') {
    panelBody.innerHTML = `
      <div style="text-align:center;padding:40px 0;">
        <div class="spinner"></div>
        <p style="color:var(--text-muted);font-size:14px;margin-top:12px">
          Job is <strong style="color:var(--status-${job.status})">${job.status}</strong>…<br/>
          Results will appear automatically.
        </p>
      </div>`;
    return;
  }

  if (job.status === 'failed') {
    panelBody.innerHTML = `
      ${renderJobMeta(job)}
      <div class="error-alert">
        <i class="bi bi-x-circle-fill" style="color:var(--error);font-size:18px;"></i> <strong>Processing Failed</strong><br/>
        <span style="margin-top:6px;display:block;font-size:12px">${escHtml(job.error || 'Unknown error')}</span>
      </div>`;
    return;
  }

  const r = job.results;
  if (!r) { panelBody.innerHTML = '<p style="color:var(--text-muted);padding:20px">Results loading…</p>'; return; }

  let html = '';

  // Render uploaded image
  if (job.filename) {
    html += `
      <div style="margin-bottom: 20px; text-align: center;">
        <img src="/uploads/${escHtml(job.filename)}" alt="Uploaded Vehicle" 
             style="width: 100%; max-height: 220px; object-fit: contain; border-radius: var(--radius-md); border: 1px solid var(--border); background: #07090f;" />
      </div>`;
  }

  // Job meta
  html += renderJobMeta(job);

  // Plate banner (from top-level DB field or results)
  const plateText = job.plate_text || r.plate_text;
  if (plateText) {
    html += `
      <div class="plate-banner">
        <div class="plate-icon"><i class="bi bi-car-front-fill"></i></div>
        <div>
          <div class="plate-label">Number Plate Detected</div>
          <div class="plate-number">${escHtml(plateText)}</div>
        </div>
      </div>`;
  } else {
    html += `
      <div class="plate-banner" style="border-color:var(--border);background:rgba(255,255,255,0.02);">
        <div class="plate-icon" style="color:var(--text-muted);"><i class="bi bi-slash-circle"></i></div>
        <div>
          <div class="plate-label" style="color:var(--text-muted);">Number Plate</div>
          <div class="plate-number" style="font-size:16px;color:var(--text-muted);letter-spacing:normal;">Not Found</div>
        </div>
      </div>`;
  }

  // Overall result
  const passIcon = r.overall_passed 
    ? '<i class="bi bi-check-circle-fill"></i>' 
    : '<i class="bi bi-exclamation-triangle-fill"></i>';
  html += `
    <div class="overall-result ${r.overall_passed ? 'pass' : 'fail'}">
      <span>${passIcon}</span>
      <span>${escHtml(r.summary)}</span>
    </div>`;

  // Checks
  html += `<div class="checks-section"><h3>Check Details</h3>`;
  (r.checks || []).forEach((check, i) => {
    const icon    = checkIcon(check.check_name, check.passed);
    const sev     = check.severity || 'info';
    const confPct = Math.round((check.confidence || 0) * 100);
    const name    = check.check_name.replace(/_/g, ' ');
    const valueStr = check.value !== null && check.value !== undefined
      ? (typeof check.value === 'object' ? JSON.stringify(check.value, null, 2) : String(check.value))
      : '';

    const statusIcon = check.passed 
      ? '<i class="bi bi-check-lg" style="color:var(--success);font-size:16px;font-weight:bold;"></i>' 
      : (sev === 'error' 
          ? '<i class="bi bi-x-lg" style="color:var(--error);font-size:16px;font-weight:bold;"></i>' 
          : '<i class="bi bi-exclamation-lg" style="color:var(--warning);font-size:16px;font-weight:bold;"></i>');

    html += `
      <div class="check-item sev-${sev}" id="check-item-${i}">
        <div class="check-header" onclick="toggleCheck(${i})">
          <span class="check-icon">${icon}</span>
          <span class="check-name">${escHtml(name)}</span>
          <span class="check-confidence">${confPct}%</span>
          <span class="check-status-icon">${statusIcon}</span>
        </div>
        <div class="check-body" id="check-body-${i}">
          <p class="check-message">${escHtml(check.message)}</p>
          ${valueStr ? `<pre class="check-value">${escHtml(valueStr)}</pre>` : ''}
          <div class="confidence-bar">
            <div class="confidence-fill sev-${sev}" style="width:${confPct}%"></div>
          </div>
        </div>
      </div>`;
  });
  html += `</div>`;

  // Processing time
  html += `
    <div class="processing-time">
      <i class="bi bi-clock-history"></i> Processed in <strong style="color:var(--accent)">${fmt(r.processing_time_ms)}</strong>
    </div>`;

  panelBody.innerHTML = html;
}

function renderJobMeta(job) {
  return `
    <div class="job-meta">
      <div class="job-meta-row">
        <span class="job-meta-label">File</span>
        <span class="job-meta-value">${escHtml(truncate(job.original_filename, 30))}</span>
      </div>
      <div class="job-meta-row">
        <span class="job-meta-label">Job ID</span>
        <span class="job-meta-value mono">${escHtml(job.id?.slice(0,18))}…</span>
      </div>
      <div class="job-meta-row">
        <span class="job-meta-label">Status</span>
        <span class="status-badge ${job.status}">${job.status}</span>
      </div>
      <div class="job-meta-row">
        <span class="job-meta-label">Size</span>
        <span class="job-meta-value">${formatBytes(job.file_size)}</span>
      </div>
      <div class="job-meta-row">
        <span class="job-meta-label">Type</span>
        <span class="job-meta-value">${escHtml(job.mime_type || '—')}</span>
      </div>
    </div>`;
}

function checkIcon(name, passed) {
  const icons = {
    blur_detection:       'bi-eye',
    brightness_analysis:  'bi-brightness-high',
    duplicate_detection:  'bi-files',
    dimension_validation: 'bi-aspect-ratio',
    screenshot_detection: 'bi-phone',
    number_plate_ocr:     'bi-card-text',
    tamper_detection:     'bi-scissors',
  };
  const cls = icons[name] || (passed ? 'bi-check-circle' : 'bi-x-circle');
  return `<i class="bi ${cls}"></i>`;
}

window.toggleCheck = function(i) {
  const body = document.getElementById(`check-body-${i}`);
  if (body) body.classList.toggle('expanded');
};

/* ─── Init ────────────────────────────────────────────────────────────── */

checkHealth();
refreshJobs();

setInterval(checkHealth,  15000);
setInterval(refreshJobs,  REFRESH_INTERVAL);
