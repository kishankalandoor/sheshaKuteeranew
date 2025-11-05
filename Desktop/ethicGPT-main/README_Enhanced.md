# EthicGPT - AI Ethics Assistant 🤖

A comprehensive AI-powered chatbot focused on AI ethics education, dataset analysis, and responsible AI practices.

## ✨ Features

### 🤖 Multiple AI Providers
- **Local Ethics Engine**: Advanced local AI responses focused on ethics
- **OpenAI GPT Integration**: Optional OpenAI API support
- **Google Gemini**: Optional Gemini AI integration
- **Automatic Fallback**: Falls back to local responses if APIs fail

### 💬 Enhanced Chat Functionality
- **Real-time Messaging**: Instant responses with typing indicators
- **Chat History**: Persistent conversation storage
- **Thread Management**: Create, view, and delete chat threads
- **Message Formatting**: Rich text with markdown support

### 📊 Dataset Integration
- **CSV Upload**: Upload and analyze ethics datasets
- **Automatic Analysis**: Ethics keyword detection and risk assessment
- **Dataset-Aware Responses**: AI responses based on uploaded data
- **Search & Filter**: Search through dataset entries

### 🛡️ Security & Performance
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Graceful error management
- **Database Storage**: MongoDB for persistent data

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to Backend folder:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ethicgpt
   OPENAI_API_KEY=your_openai_key_here (optional)
   GEMINI_API_KEY=your_gemini_key_here (optional)
   PORT=8080
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to Frontend folder:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
ethicGPT-main/
├── Backend/
│   ├── config/              # Configuration files
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.js  # Error handling middleware
│   │   └── logger.js        # Request logging
│   ├── models/              # MongoDB models
│   │   └── Thread.js        # Chat thread model
│   ├── routes/              # API routes
│   │   ├── chat.js          # Chat endpoints
│   │   ├── ethics.js        # Ethics knowledge endpoints
│   │   └── dataset.js       # Dataset management
│   ├── utils/               # Utility functions
│   │   └── aiProvider.js    # AI response generation
│   ├── server_enhanced.js   # Main server file
│   ├── package.json         # Dependencies
│   └── .env.example         # Environment variables template
├── Frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Dependencies
│   └── vite.config.js       # Vite configuration
└── README_Enhanced.md       # This file
```

## 🎯 Usage Guide

### Basic Chat
1. Open the application
2. Type your message about AI ethics
3. Get intelligent responses from the bot

### Dataset Upload
1. Click "Upload CSV" in the sidebar
2. Select your ethics-related CSV file
3. The bot will analyze and provide insights
4. Ask questions about your dataset

### AI Provider Selection
1. Choose from Local, OpenAI, or Gemini in the sidebar
2. Local provider works without API keys
3. External providers require API configuration

### Chat Management
1. Start new conversations with "+ New Chat"
2. View chat history in the sidebar
3. Delete conversations using the trash icon

## 🔧 API Endpoints

### Chat Endpoints
- `GET /api/chat/threads` - Get all chat threads
- `GET /api/chat/thread/:id` - Get specific thread messages
- `POST /api/chat/message` - Send a message
- `DELETE /api/chat/thread/:id` - Delete a thread
- `GET /api/chat/stats` - Get chat statistics

### Ethics Endpoints
- `GET /api/ethics/principles` - Get ethics principles
- `GET /api/ethics/applications` - Get application areas
- `POST /api/ethics/analyze` - Analyze text for ethics content

### Dataset Endpoints
- `POST /api/dataset/upload` - Upload CSV dataset
- `GET /api/dataset/` - Get all datasets
- `GET /api/dataset/:id` - Get specific dataset
- `POST /api/dataset/:id/search` - Search dataset

### Health Check
- `GET /health` - Server health status

## 🛠️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb://localhost:27017/ethicgpt` |
| `OPENAI_API_KEY` | OpenAI API key | No | - |
| `GEMINI_API_KEY` | Gemini AI API key | No | - |
| `PORT` | Server port | No | `8080` |
| `NODE_ENV` | Environment | No | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:3000` |

### Rate Limiting
- Chat messages: 20 requests per minute per IP
- General API: 100 requests per 15 minutes per IP

## 🎨 Features in Detail

### Local AI Engine
The local AI engine provides comprehensive ethics responses without requiring external APIs:
- **Ethics Principles**: Detailed explanations of fairness, transparency, accountability, privacy, and beneficence
- **Application Areas**: Healthcare, finance, criminal justice, employment ethics
- **Dataset Analysis**: Automatic detection of ethics-related content
- **Contextual Responses**: Responses based on conversation history and uploaded data

### Dataset Analysis
Upload CSV files to get:
- **Automatic Ethics Detection**: Identifies bias, fairness, and risk-related content
- **Risk Assessment**: Categorizes entries by risk level
- **Keyword Analysis**: Frequency analysis of ethics-related terms
- **Interactive Queries**: Ask specific questions about your data

## 🔒 Security Features

- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents abuse and spam
- **Error Handling**: Graceful error responses without exposing sensitive data
- **CORS Protection**: Configured for specific frontend origins
- **Security Headers**: Helmet.js for additional security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues

**Backend won't start:**
- Check MongoDB connection
- Verify environment variables
- Ensure port 8080 is available

**Frontend can't connect:**
- Verify backend is running on port 8080
- Check CORS configuration
- Ensure frontend is on correct port

**API keys not working:**
- Verify API key format
- Check API provider documentation
- Use local provider as fallback

### Getting Help
- Check the console for error messages
- Verify environment configuration
- Test with local provider first

## 🔄 Updates

### Version 2.0 Features
- Enhanced error handling
- Multiple AI provider support
- Dataset upload and analysis
- Real-time chat functionality
- Improved security measures
- Mobile-responsive design
- Comprehensive API documentation

---

**EthicGPT** - Making AI ethics accessible to everyone! 🌟
