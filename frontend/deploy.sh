#!/bin/bash

# 🚀 Hugup Quick Deploy Script
# Run this script to deploy Hugup to various platforms

echo "🚀 Hugup Deployment Helper"
echo "=========================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if build exists
if [ ! -d "build" ]; then
    echo "📦 Building project..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
    echo "✅ Build completed successfully!"
fi

echo ""
echo "Choose deployment platform:"
echo "1. Vercel (Recommended)"
echo "2. Netlify"
echo "3. GitHub Pages"
echo "4. Firebase Hosting"
echo "5. Surge.sh"
echo "6. Just build (no deploy)"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        vercel --prod
        ;;
    2)
        echo "🚀 Deploying to Netlify..."
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        netlify deploy --dir=build --prod
        ;;
    3)
        echo "🚀 Deploying to GitHub Pages..."
        npm run deploy
        ;;
    4)
        echo "🚀 Deploying to Firebase..."
        if ! command -v firebase &> /dev/null; then
            echo "Installing Firebase CLI..."
            npm install -g firebase-tools
        fi
        firebase deploy
        ;;
    5)
        echo "🚀 Deploying to Surge.sh..."
        if ! command -v surge &> /dev/null; then
            echo "Installing Surge CLI..."
            npm install -g surge
        fi
        cd build && surge
        ;;
    6)
        echo "✅ Build completed! Files are in the 'build' directory."
        echo "You can deploy these files to any static hosting service."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "Your Hugup app should be live soon!"
echo ""
echo "📖 For more deployment options, check DEPLOYMENT.md"
echo "📱 For mobile app publishing, check PUBLISHING_GUIDE.md"