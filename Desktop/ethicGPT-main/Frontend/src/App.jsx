import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const API_BASE = 'http://localhost:8080/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [provider, setProvider] = useState('local');
  const [threads, setThreads] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [currentDataset, setCurrentDataset] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeChat();
    loadThreads();
    loadDatasets();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeChat = () => {
    const threadId = 'thread_' + Date.now();
    setCurrentThreadId(threadId);
    setMessages([{
      role: 'assistant',
      content: '👋 Hello! I\'m EthicBot, your AI Ethics Assistant. I can help you understand AI ethics principles, analyze datasets for ethical issues, and explore responsible AI practices. How can I assist you today?',
      timestamp: new Date()
    }]);
  };

  const loadThreads = async () => {
    try {
      const response = await fetch(`${API_BASE}/chat/threads`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data.threads || []);
      }
    } catch (error) {
      console.error('Error loading threads:', error);
    }
  };

  const loadDatasets = async () => {
    try {
      const response = await fetch(`${API_BASE}/dataset/`);
      if (response.ok) {
        const data = await response.json();
        setDatasets(data.datasets || []);
        if (data.currentDataset) {
          const current = data.datasets.find(d => d.id === data.currentDataset);
          setCurrentDataset(current);
        }
      }
    } catch (error) {
      console.error('Error loading datasets:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId: currentThreadId,
          message: inputMessage,
          provider: provider
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        loadThreads(); // Refresh threads list
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    initializeChat();
  };

  const loadThread = async (threadId) => {
    try {
      const response = await fetch(`${API_BASE}/chat/thread/${threadId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })));
        setCurrentThreadId(threadId);
        setShowSidebar(false);
      }
    } catch (error) {
      console.error('Error loading thread:', error);
    }
  };

  const deleteThread = async (threadId, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${API_BASE}/chat/thread/${threadId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        loadThreads();
        if (threadId === currentThreadId) {
          initializeChat();
        }
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const uploadDataset = async (file) => {
    const formData = new FormData();
    formData.append('dataset', file);

    try {
      const response = await fetch(`${API_BASE}/dataset/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentDataset(data.dataset);
        loadDatasets();
        
        // Add success message to chat
        const successMessage = {
          role: 'assistant',
          content: `✅ **Dataset uploaded successfully!**\n\n📄 **File:** ${data.dataset.filename}\n📊 **Entries:** ${data.dataset.rowCount}\n🔍 **Ethics Analysis:** ${data.dataset.analysis?.ethicsRelated ? 'Ethics-related content detected' : 'No direct ethics content detected'}\n\nYou can now ask me questions about your dataset!`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading dataset:', error);
      const errorMessage = {
        role: 'assistant',
        content: '❌ Failed to upload dataset. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      uploadDataset(file);
    } else {
      alert('Please select a CSV file');
    }
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/•/g, '•');
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3>EthicBot</h3>
          <button onClick={() => setShowSidebar(false)} className="close-sidebar">×</button>
        </div>
        
        <button onClick={startNewChat} className="new-chat-btn">
          + New Chat
        </button>

        {/* Provider Selection */}
        <div className="provider-section">
          <h4>AI Provider</h4>
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="local">Local (Ethics Focused)</option>
            <option value="openai">OpenAI GPT</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        {/* Dataset Upload */}
        <div className="dataset-section">
          <h4>Dataset</h4>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="dataset-upload"
          />
          <label htmlFor="dataset-upload" className="upload-btn">
            📁 Upload CSV
          </label>
          {currentDataset && (
            <div className="current-dataset">
              <p><strong>{currentDataset.filename}</strong></p>
              <p>{currentDataset.rowCount} entries</p>
            </div>
          )}
        </div>

        {/* Chat History */}
        <div className="threads-section">
          <h4>Chat History</h4>
          {threads.map(thread => (
            <div
              key={thread.threadId}
              className={`thread-item ${thread.threadId === currentThreadId ? 'active' : ''}`}
              onClick={() => loadThread(thread.threadId)}
            >
              <span className="thread-title">{thread.title}</span>
              <button
                onClick={(e) => deleteThread(thread.threadId, e)}
                className="delete-thread"
              >
                ��️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        <div className="chat-header">
          <button onClick={() => setShowSidebar(true)} className="menu-btn">
            ☰
          </button>
          <h1>EthicBot - AI Ethics Assistant</h1>
          <div className="provider-indicator">
            {provider === 'local' ? '🤖' : provider === 'openai' ? '🧠' : '✨'} {provider}
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div
                  className="message-text"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about AI ethics, upload a dataset, or explore ethical principles..."
            disabled={isLoading}
            rows="1"
          />
          <button onClick={sendMessage} disabled={isLoading || !inputMessage.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
