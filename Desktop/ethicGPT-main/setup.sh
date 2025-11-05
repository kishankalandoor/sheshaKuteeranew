#!/bin/bash

# EthicGPT Setup Script
echo "🤖 Setting up EthicGPT - AI Ethics Assistant"
echo "============================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) and try again."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found"
else
    echo "⚠️  MongoDB not found. You can:"
    echo "   - Install MongoDB locally"
    echo "   - Use MongoDB Atlas (cloud)"
    echo "   - Update MONGODB_URI in .env file"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd Backend

# Install backend dependencies
if [ -f "package_enhanced.json" ]; then
    cp package_enhanced.json package.json
fi

npm install

# Setup environment variables
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "ℹ️  Please edit Backend/.env file to configure your settings"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎨 Installing Frontend Dependencies..."
cd ../Frontend

npm install

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Start Backend:  cd Backend && npm run dev"
echo "   2. Start Frontend: cd Frontend && npm run dev"
echo "   3. Open: http://localhost:5173"
echo ""
echo "📖 For detailed instructions, see README_Enhanced.md"
echo ""
echo "🔧 Configuration:"
echo "   - Edit Backend/.env for database and API keys"
echo "   - MongoDB URI: Default is mongodb://localhost:27017/ethicgpt"
echo "   - API Keys: OpenAI and Gemini are optional (local fallback available)"
