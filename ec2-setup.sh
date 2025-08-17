#!/bin/bash

echo "🖥️ Setting up EC2 instance for Daily Activity Tracker..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
echo "📥 Installing Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
echo "📥 Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "📥 Installing Nginx..."
sudo apt install nginx -y

# Install Certbot for SSL
echo "📥 Installing Certbot..."
sudo apt install certbot python3-certbot-nginx -y

# Create application directory
echo "📁 Creating application directory..."
sudo mkdir -p /home/wxadmin/daily-activity-tracker
sudo chown wxadmin:wxadmin /home/wxadmin/daily-activity-tracker

# Configure Nginx
echo "⚙️ Configuring Nginx..."
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
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/daily-activity-tracker /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ EC2 setup completed successfully!"
echo "🌐 Nginx is configured and running"
echo "📁 Application directory: /home/wxadmin/daily-activity-tracker"
echo "🚀 Ready to deploy your application!"
