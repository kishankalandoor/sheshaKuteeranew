(function () {
  const config = window.SITE_CONFIG || { apiBase: '/backend', assetBase: '/frontend/public' };

  const tickerRow1 = [
    'Complete Electric Fence Systems', 'Solar Powered Fence Solutions', "India\'s Trusted Electric Fence Experts", 'MSME Certified Enterprise', '30+ Years of Industry Experience', '110+ Quality Products', 'Professional Installation Services', 'PAN India Supply & Support', 'GST Registered Business', 'AI-Enabled Smart Fence Solutions'
  ];
  const tickerRow2 = [
    'Quality Products at Competitive Prices', 'Trusted by Farmers Across India', 'Built for Indian Field Conditions', 'Secure Your Property with Confidence', 'Durable and Reliable Fence Systems', 'Remote Monitoring Fence Technology', 'Smart Fence Control Solutions', 'Fast Delivery Across India', 'Professional Site Survey Services', 'Fence Solutions for Every Terrain'
  ];

  const aboutHighlights = [
    { icon: 'bi-cpu-fill', title: 'AI Fence Technology', desc: 'AI-enabled monitoring, remote alerts and smart control.' },
    { icon: 'bi-sun-fill', title: 'Solar Power Solutions', desc: 'Off-grid solar energizer systems with MPPT controllers.' },
    { icon: 'bi-lightning-charge-fill', title: 'Largest Energizer Agency', desc: 'India\'s premier distributor of fence energizers.' },
    { icon: 'bi-globe2', title: 'PAN India Operations', desc: 'Supplying and installing electric fence systems nationwide.' }
  ];

  const aboutInfo = [
    { icon: 'bi-building', label: 'Enterprise', value: 'Hitech Power (Proprietary)' },
    { icon: 'bi-geo-alt-fill', label: 'Address', value: 'I-293, Kalandoor, Subramanya, Karnataka - 574238' },
    { icon: 'bi-telephone-fill', label: 'Phone', value: '+91 94484 81409' },
    { icon: 'bi-envelope-fill', label: 'Email', value: 'info@hitechpowers.com' },
    { icon: 'bi-patch-check-fill', label: 'GSTIN', value: '29ADQPV4208E1Z6' },
    { icon: 'bi-award-fill', label: 'Recognition', value: 'MSME - Govt. of India' }
  ];

  const solutions = [
    { icon: 'bi-check-circle-fill', color: 'var(--color-electric)', title: 'Residential Perimeter Fencing', desc: 'Boundary security for homes and villas.', tags: ['Home Security', 'Perimeter Guard', 'Alarm Integration'] },
    { icon: 'bi-tree-fill', color: '#00E5A0', title: 'Agricultural & Farm Fencing', desc: 'Crop and orchard protection for remote locations.', tags: ['Crop Protection', 'Solar Powered', 'Low Maintenance'] },
    { icon: 'bi-shield-fill-exclamation', color: '#FFB800', title: 'Elephant Guard Fencing', desc: 'High-joule systems to deter elephants safely.', tags: ['Elephant Deterrent', 'Forest Edge', 'High Joule Output'] },
    { icon: 'bi-eye-fill', color: '#FF6B35', title: 'Wild Animal Guard Fencing', desc: 'Systems for lion, tiger, leopard and wild boar zones.', tags: ['Lion / Tiger Guard', 'Wild Boar', 'Leopard / Bear'] },
    { icon: 'bi-bug-fill', color: '#A855F7', title: 'Snake & Small Animal Fencing', desc: 'Low-level close-spacing fence systems.', tags: ['Snake Guard', 'Mongoose', 'Rodent Control'] },
    { icon: 'bi-emoji-neutral-fill', color: '#F59E0B', title: 'Monkey Guard Fencing', desc: 'Deterrent systems for orchards and gardens.', tags: ['Monkey Deterrent', 'Orchard Guard', 'Garden Protection'] },
    { icon: 'bi-building-fill', color: 'var(--color-electric)', title: 'Industrial & Commercial Fencing', desc: 'Perimeter systems for factories and warehouses.', tags: ['24/7 Security', 'CCTV Integration', 'Access Control'] },
    { icon: 'bi-cpu-fill', color: '#00E5A0', title: 'AI-Enabled Smart Fence', desc: 'Remote monitoring, app alerts and smart control.', tags: ['Remote Monitoring', 'GSM Alerts', 'Smart Control'] },
    { icon: 'bi-sun-fill', color: '#FFB800', title: 'Solar Fence Systems', desc: 'Complete solar-powered kits with battery backup.', tags: ['Off-Grid', 'Solar Panel', 'Lithium Battery'] }
  ];

  const trustItems = [
    { icon: 'bi-award-fill', label: 'MSME', sub: 'Govt. of India' },
    { icon: 'bi-patch-check-fill', label: 'GST Verified', sub: '29ADQPV4208E1Z6' },
    { icon: 'bi-globe2', label: 'PAN India', sub: 'All States Served' },
    { icon: 'bi-star-fill', label: '30+ Years', sub: 'Industry Expertise' },
    { icon: 'bi-cpu-fill', label: 'AI Fencing', sub: 'Smart Technology' }
  ];

  const partners1 = [
    { name: 'Tata Power', img: 'partner-tatapower.png', desc: 'Tata Power' },
    { name: 'Tata Steel', img: 'partner-tatasteel.png', desc: 'Tata Steel' },
    { name: 'Jindal Steel', img: 'partner-jindal.png', desc: 'Jindal Steel & Power' },
    { name: 'JSW Steel', img: 'partner-jsw.png', desc: 'JSW Steel' },
    { name: 'SAIL', img: 'partner-sail.jpg', desc: 'Steel Authority of India' },
    { name: 'Vizag Steel', img: 'partner-vizagsteel.png', desc: 'Vizag Steel' },
    { name: 'MSME India', img: 'msme.jpeg', desc: 'Govt. of India - MSME', wide: true }
  ];
  const partners2 = [
    { name: 'Adani Group', img: 'partner-adani.png', desc: 'Adani Group' },
    { name: 'Luminous', img: 'partner-luminous.png', desc: 'Luminous Power' },
    { name: 'Exide', img: 'partner-exide.jpg', desc: 'Exide Batteries' },
    { name: 'Amaron', img: 'partner-amaron.jpg', desc: 'Amaron Batteries' },
    { name: 'V-Guard', img: 'partner-vguard.png', desc: 'V-Guard Industries' },
    { name: 'Havells', img: 'partner-havells.png', desc: 'Havells India' },
    { name: 'Godrej', img: 'partner-godrej.png', desc: 'Godrej' },
    { name: 'Essar', img: 'partner-essar.png', desc: 'Essar Group' },
    { name: 'Mecanumtech', img: 'partner-mecanumtech.png', desc: 'Mecanumtech' }
  ];

  const categories = [
    { id: 'power', title: 'Power & Control', icon: 'bi-lightning-charge-fill', image: 'cat-energizer.png', count: 20, desc: 'Energizers, solar systems and monitoring equipment.', items: ['H600 / H900 / H1200 Fence Charger', 'Solar Panel & Stand', 'MPPT / PWM Charge Controller', 'Tubular / SMF / Lithium Battery', 'Control Panel & Alarm Unit'] },
    { id: 'earthing', title: 'Earthing & Protection', icon: 'bi-shield-fill-check', image: 'cat-earthing.png', count: 11, desc: 'Earthing kits, lightning divertors and surge protectors.', items: ['Complete Earth System Kit', 'Earthing Rod (6ft & 8ft)', 'Earthing Chemical Powder', 'Earth Clamp', 'Lightning Arrestor & Surge Protector'] },
    { id: 'wire', title: 'Wires & Conductors', icon: 'bi-infinity', image: 'cat-wire.png', count: 9, desc: 'Fence wire, poly conductors and underground cables.', items: ['ACSR Fence Wire', 'Poly Wire & Poly Rope', 'Poly Tape', 'GI Binding Wire', 'Lead Out Cable'] },
    { id: 'insulators', title: 'Insulators', icon: 'bi-circle-square', image: 'cat-insulators.png', count: 12, desc: 'Pin, post, strain and specialty insulators.', items: ['Reel Insulators', 'Line Post Insulators', 'Ring & Offset Insulators', 'Corner & Strain Insulators', 'Tree Insulators'] },
    { id: 'poles', title: 'Poles & Structures', icon: 'bi-bar-chart-fill', image: 'cat-poles.png', count: 18, desc: 'GI poles and structural hardware.', items: ['Main Pole 6.5ft & 8ft', 'Supporting Pole', 'Corner & Gate Pole', 'GI T Angle', 'GI Fasteners'] },
    { id: 'safety', title: 'Safety & Warning', icon: 'bi-exclamation-triangle-fill', image: 'cat-safety.png', count: 7, desc: 'Signs and safety accessories.', items: ['Warning Sign', 'Danger Fence Sign', 'Warning Stickers', 'DC Fuse & MCB', 'Weatherproof Junction Box'] },
    { id: 'tools', title: 'Installation Tools', icon: 'bi-tools', image: 'cat-tools.png', count: 10, desc: 'Professional tools for installation teams.', items: ['Wire Crimping Tool', 'Wire Cutter', 'Fencing Plier', 'Post Hole Digger', 'Safety Gloves'] },
    { id: 'kits', title: 'Complete Kits', icon: 'bi-box-seam-fill', image: 'cat-kits.png', count: 2, desc: 'Ready-to-install complete kits.', items: ['Residential Perimeter Fence Kit', 'Complete Installation Kit'] }
  ];

  const filters = [
    { id: 'all', label: 'All Categories' },
    { id: 'power', label: 'Power' },
    { id: 'earthing', label: 'Earthing' },
    { id: 'wire', label: 'Wires' },
    { id: 'insulators', label: 'Insulators' },
    { id: 'poles', label: 'Poles' },
    { id: 'safety', label: 'Safety' },
    { id: 'kits', label: 'Kits' }
  ];

  const services = [
    { icon: 'bi-hammer', title: 'Complete Installation', desc: 'Full installation from survey to commissioning.', features: ['Site survey and planning', 'Post and pole installation', 'Wire tensioning', 'Energizer commissioning', 'Warning sign placement'] },
    { icon: 'bi-sun-fill', title: 'Solar System Setup', desc: 'Off-grid solar setups for electric fences.', features: ['Solar panel sizing', 'MPPT / PWM setup', 'Battery installation', 'System testing', 'Remote deployment'] },
    { icon: 'bi-truck', title: 'Supply & Transport', desc: 'Reliable product delivery to project sites.', features: ['Complete catalog supply', 'Bulk fulfillment', 'Door delivery', 'Secure packaging', 'GST invoicing'] }
  ];

  const whyFeatures = [
    { icon: 'bi-patch-check-fill', title: 'Quality Assured Products', desc: 'Products tested for Indian field conditions.' },
    { icon: 'bi-sun-fill', title: 'Solar-Ready Solutions', desc: 'Off-grid fence systems with robust components.' },
    { icon: 'bi-box-seam-fill', title: 'One-Stop Supply', desc: 'Everything from energizers to warning signs.' },
    { icon: 'bi-person-badge-fill', title: 'Expert Site Team', desc: 'Technical support and installation expertise.' }
  ];

  function smoothScrollSetup() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      });
    });
  }

  function setupNavbar() {
    const nav = document.querySelector('.navbar');
    const openBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    window.addEventListener('scroll', function () {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    if (openBtn && mobileMenu) openBtn.addEventListener('click', function () { mobileMenu.classList.add('open'); });
    if (closeBtn && mobileMenu) closeBtn.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  }

  function setupReveal() {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function setupHeroEffects() {
    const hero = document.getElementById('hero');
    const overlay = document.getElementById('hero-overlay');
    const video = document.getElementById('hero-video');
    if (!hero || !overlay) return;

    if (window.innerWidth <= 768) {
      if (video) {
        const source = video.querySelector('source');
        if (source) {
          source.src = config.assetBase + '/banner-mobile.mp4';
          video.load();
        }
      }
      return;
    }

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      overlay.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(0, 212, 255, 0.12) 0%, rgba(6, 9, 18, 0.85) 55%, rgba(6, 9, 18, 0.96) 100%)';
    });
  }

  function renderTicker() {
    const row1 = document.getElementById('ticker-row-1');
    const row2 = document.getElementById('ticker-row-2');
    if (!row1 || !row2) return;

    const makeItem = function (text, icon) {
      return '<span class="ticker-text-item"><i class="bi ' + icon + '"></i>' + text + '<span class="ticker-dot"></span></span>';
    };
    row1.innerHTML = tickerRow1.concat(tickerRow1).map(function (t) { return makeItem(t, 'bi-lightning-charge-fill'); }).join('');
    row2.innerHTML = tickerRow2.concat(tickerRow2).map(function (t) { return makeItem(t, 'bi-shield-fill-check'); }).join('');
  }

  function renderAbout() {
    const highlights = document.getElementById('about-highlights');
    const info = document.getElementById('about-info');
    if (highlights) {
      highlights.innerHTML = aboutHighlights.map(function (h) {
        return '<div class="about-highlight-item"><div class="about-highlight-icon"><i class="bi ' + h.icon + '"></i></div><h4>' + h.title + '</h4><p>' + h.desc + '</p></div>';
      }).join('');
    }
    if (info) {
      info.innerHTML = aboutInfo.map(function (row) {
        return '<div class="about-info-row" role="listitem"><i class="bi ' + row.icon + '"></i><strong>' + row.label + ':</strong><span style="color:var(--color-text-secondary)">' + row.value + '</span></div>';
      }).join('');
    }
  }

  function renderSolutions() {
    const grid = document.getElementById('solutions-grid');
    if (!grid) return;
    grid.innerHTML = solutions.map(function (s, i) {
      const tags = s.tags.map(function (t) { return '<span class="solution-tag">' + t + '</span>'; }).join('');
      return '<article class="solution-card reveal reveal-delay-' + ((i % 3) + 1) + '"><div class="solution-card-icon" style="--sol-color:' + s.color + '"><i class="bi ' + s.icon + '"></i></div><h3 class="solution-card-title">' + s.title + '</h3><p class="solution-card-desc">' + s.desc + '</p><div class="solution-tags">' + tags + '</div></article>';
    }).join('');
  }

  function renderPartners() {
    const trust = document.getElementById('trust-strip');
    const row1 = document.getElementById('partners-row-1');
    const row2 = document.getElementById('partners-row-2');
    if (trust) {
      trust.innerHTML = trustItems.map(function (t) {
        return '<div class="trust-item"><div class="trust-icon"><i class="bi ' + t.icon + '"></i></div><div class="trust-text"><strong>' + t.label + '</strong><span>' + t.sub + '</span></div></div>';
      }).join('');
    }

    const card = function (p) {
      const wide = p.wide ? ' partner-logo-wide' : '';
      return '<div class="partner-logo-card' + wide + '"><img src="' + config.assetBase + '/' + p.img + '" alt="' + p.name + '" class="partner-logo-img" style="mix-blend-mode:multiply" loading="lazy" /><span class="partner-name">' + p.desc + '</span></div>';
    };

    if (row1) row1.innerHTML = partners1.concat(partners1, partners1, partners1).map(card).join('');
    if (row2) row2.innerHTML = partners2.concat(partners2, partners2, partners2).map(card).join('');
  }

  function renderProducts() {
    const filterWrap = document.getElementById('products-filter');
    const grid = document.getElementById('products-grid');
    if (!filterWrap || !grid) return;

    let active = 'all';

    function drawFilters() {
      filterWrap.innerHTML = filters.map(function (f) {
        const cls = f.id === active ? 'filter-btn active' : 'filter-btn';
        return '<button class="' + cls + '" data-filter="' + f.id + '">' + f.label + '</button>';
      }).join('');
      filterWrap.querySelectorAll('button').forEach(function (btn) {
        btn.addEventListener('click', function () {
          active = btn.getAttribute('data-filter') || 'all';
          drawFilters();
          drawCards();
        });
      });
    }

    function drawCards() {
      const items = active === 'all' ? categories : categories.filter(function (c) { return c.id === active; });
      grid.innerHTML = items.map(function (cat) {
        const tags = cat.items.slice(0, 5).map(function (item) {
          return '<div class="product-item-tag"><i class="bi bi-chevron-right"></i>' + item + '</div>';
        }).join('');
        return '<article class="product-card" role="listitem"><div class="product-card-image"><img src="' + config.assetBase + '/' + cat.image + '" alt="' + cat.title + '" loading="lazy" /><div class="product-card-image-overlay"></div><div class="product-card-count">' + cat.count + ' items</div></div><div class="product-card-body"><div class="product-card-icon"><i class="bi ' + cat.icon + '"></i></div><h3 class="product-card-title">' + cat.title + '</h3><p class="product-card-desc">' + cat.desc + '</p><div class="product-card-items">' + tags + '</div></div></article>';
      }).join('');
    }

    drawFilters();
    drawCards();
  }

  function renderServicesAndWhy() {
    const servicesGrid = document.getElementById('services-grid');
    const whyGrid = document.getElementById('why-features');
    if (servicesGrid) {
      servicesGrid.innerHTML = services.map(function (s, i) {
        const features = s.features.map(function (f) { return '<div class="service-feature-item"><i class="bi bi-check-circle-fill"></i><span>' + f + '</span></div>'; }).join('');
        return '<article class="service-card reveal reveal-delay-' + (i + 1) + '"><div class="service-card-icon"><i class="bi ' + s.icon + '"></i></div><h3>' + s.title + '</h3><p>' + s.desc + '</p><div class="service-card-features">' + features + '</div></article>';
      }).join('');
    }

    if (whyGrid) {
      whyGrid.innerHTML = whyFeatures.map(function (f, i) {
        return '<div class="feature-card reveal reveal-delay-' + ((i % 2) + 1) + '"><div class="feature-card-icon"><i class="bi ' + f.icon + '"></i></div><h3>' + f.title + '</h3><p>' + f.desc + '</p></div>';
      }).join('');
    }
  }

  function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('contact-submit-btn');
    if (!form || !status || !submitBtn) return;

    function setStatus(type, message) {
      if (!message) {
        status.innerHTML = '';
        return;
      }
      const ok = type === 'success';
      status.innerHTML = '<div style="background:' + (ok ? 'rgba(0,229,160,0.1)' : 'rgba(255,80,80,0.1)') + ';border:1px solid ' + (ok ? 'rgba(0,229,160,0.3)' : 'rgba(255,80,80,0.3)') + ';border-radius:8px;padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:10px;color:' + (ok ? 'var(--color-accent-green)' : '#ff5050') + ';font-size:.9rem"><i class="bi ' + (ok ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill') + '"></i>' + message + '</div>';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      setStatus('', '');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      // ============================================================
      // Web3Forms — free form service, no email activation needed.
      // Works perfectly on GitHub Pages static sites.
      //
      // SETUP (one time only):
      //   1. Go to https://web3forms.com
      //   2. Enter info@hitechpowers.com → click "Create Access Key"
      //   3. Copy the key and paste it below replacing YOUR_ACCESS_KEY
      // ============================================================
      const mailPayload = new FormData();
      mailPayload.append('access_key', '58186392-9e95-44a8-a2e2-208a084410af');
      mailPayload.append('subject', 'New Fencing Quote Request: ' + (payload.subject || 'General Enquiry') + ' — ' + payload.name);
      mailPayload.append('from_name', 'Hitech Power');
      mailPayload.append('from_email', 'info@hitechpowers.com');
      mailPayload.append('name', payload.name);
      mailPayload.append('phone', payload.phone);
      mailPayload.append('email', payload.email);
      mailPayload.append('enquiry_type', payload.subject);
      mailPayload.append('message', payload.message);
      mailPayload.append('botcheck', '');

      // ── Auto-reply to the enquirer ──────────────────────────────────
      mailPayload.append('replyto', payload.email || '');
      mailPayload.append('autoresponse', [
        'Dear ' + (payload.name || 'Valued Customer') + ',',
        '',
        'Thank you for contacting Hitech Power.',
        '',
        'We appreciate your inquiry. Our team has received your message and will get back to you as soon as possible with the best solution for your requirements.',
        '',
        'Regards,',
        'Hitech Power',
        'info@hitechpowers.com',
        'www.hitechpowers.com'
      ].join('\n'));

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: mailPayload
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus('success', 'Message sent! We will contact you within 24 hours.');
          form.reset();
        } else {
          setStatus('error', data.message || 'Something went wrong. Please try again or call us directly.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setStatus('error', 'Network error. Please check your connection and try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
      }
    });
  }

  function setupFooter() {
    const footer = document.getElementById('footer');
    const aura = document.getElementById('footer-aura');
    const newsletterForm = document.getElementById('newsletter-form');
    const submit = document.getElementById('newsletter-submit');
    if (footer && aura && window.innerWidth > 768) {
      footer.addEventListener('mousemove', function (e) {
        const rect = footer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        aura.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(0, 212, 255, 0.1) 0%, rgba(3, 5, 9, 0.85) 55%, #030509 100%)';
      });
    }

    if (newsletterForm && submit) {
      newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submit.textContent = 'Subscribed';
        setTimeout(function () {
          submit.textContent = 'Submit';
          newsletterForm.reset();
        }, 3000);
      });
    }
  }

  renderTicker();
  renderAbout();
  renderSolutions();
  renderPartners();
  renderProducts();
  renderServicesAndWhy();
  smoothScrollSetup();
  setupNavbar();
  setupHeroEffects();
  setupContactForm();
  setupFooter();
  setupReveal();
})();
