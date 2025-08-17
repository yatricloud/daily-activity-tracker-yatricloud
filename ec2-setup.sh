#!/bin/bash

echo "🚀 Setting up EC2 instance for Daily Activity Tracker..."

# Exit on any error
set -e

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
echo "📦 Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install nginx
echo "📦 Installing nginx..."
sudo apt install -y nginx

# Configure nginx
echo "🔧 Configuring nginx..."
sudo tee /etc/nginx/sites-available/daily-activity-tracker <<EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/daily-activity-tracker /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Install git
echo "📦 Installing git..."
sudo apt install -y git

# Install build essentials
echo "📦 Installing build essentials..."
sudo apt install -y build-essential

echo "✅ EC2 setup completed successfully!"
echo "🌐 Nginx is configured and running"
echo "📦 Node.js, npm, and PM2 are installed"
echo "🔧 Ready to deploy your application!"
