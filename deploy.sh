#!/bin/bash

echo "🚀 Starting deployment of Daily Activity Tracker..."

# Exit on any error
set -e

# Get the current directory
CURRENT_DIR=$(pwd)
echo "📁 Current directory: $CURRENT_DIR"

# Build the application
echo "📦 Building the application..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Stop existing PM2 process if running
echo "🛑 Stopping existing PM2 process..."
pm2 stop daily-activity-tracker || true
pm2 delete daily-activity-tracker || true

# Start the application with PM2
echo "▶️ Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on system boot
echo "🔧 Setting up PM2 startup script..."
pm2 startup

echo "✅ Deployment completed successfully!"
echo "🌐 Application is running on port 3000"
echo "📊 Check status with: pm2 status"
echo "📝 Check logs with: pm2 logs daily-activity-tracker"
