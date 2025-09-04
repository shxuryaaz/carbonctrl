#!/bin/bash

# CarbonCtrl Deployment Script
echo "🚀 Starting CarbonCtrl deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📥 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please log in to Firebase:"
    firebase login
fi

# Deploy to Firebase
echo "🔥 Deploying to Firebase..."
firebase deploy

if [ $? -eq 0 ]; then
    echo "🎉 Deployment completed successfully!"
    echo "🌐 Your app is now live!"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
