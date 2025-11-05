#!/bin/bash

# EthicBot PHP Server Startup Script
# This script starts the PHP built-in server for the AI Ethics Chatbot

echo "🚀 Starting EthicBot Enhanced PHP Server..."
echo "📍 Location: $(pwd)"
echo "🌐 URL: http://localhost:8080"
echo "📝 Main file: index_php.html"
echo "🔧 Backend: ethicbot.php"
echo ""
echo "⚠️  Make sure you have PHP installed (php --version)"
echo "💡 Use Ctrl+C to stop the server"
echo ""

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed or not in PATH"
    echo "📥 Please install PHP first:"
    echo "   macOS: brew install php"
    echo "   Ubuntu: sudo apt install php"
    echo "   Windows: Download from https://www.php.net/"
    exit 1
fi

echo "✅ PHP version: $(php --version | head -n 1)"
echo ""

# Start the PHP built-in server
echo "🌟 Starting server..."
php -S localhost:8080 -t . ethicbot.php
