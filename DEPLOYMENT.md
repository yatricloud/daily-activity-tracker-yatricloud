# Daily Activity Tracker - Deployment Guide

## Overview
This guide covers the deployment of the Daily Activity Tracker application on an EC2 instance using PM2 and Nginx.

## Prerequisites
- Ubuntu 20.04+ EC2 instance
- SSH access to the instance
- Domain name (optional, for SSL)

## Initial Setup

### 1. EC2 Instance Setup
Run the EC2 setup script to install dependencies:
```bash
chmod +x ec2-setup.sh
./ec2-setup.sh
```

This script will:
- Update system packages
- Install Node.js 18.x
- Install PM2 globally
- Install and configure Nginx
- Install Certbot for SSL (optional)
- Configure firewall rules

### 2. Application Deployment
Clone and deploy the application:
```bash
# Clone the repository
git clone <your-repo-url>
cd yatri-3-tier-application

# Install dependencies
npm install

# Build the application
npm run build

# Deploy with PM2
./deploy.sh
```

## PM2 Configuration

The application uses PM2 for process management with the following configuration:
- **Name**: daily-activity-tracker
- **Script**: start.sh
- **Instances**: 1
- **Memory limit**: 1GB
- **Auto-restart**: Enabled
- **Logs**: Stored in ./logs directory

## Nginx Configuration

Nginx is configured as a reverse proxy:
- **Port**: 80 (HTTP)
- **Backend**: localhost:3000
- **WebSocket support**: Enabled for real-time features

## SSL Configuration (Optional)

To enable HTTPS:
```bash
sudo certbot --nginx -d yourdomain.com
```

## Monitoring and Maintenance

### PM2 Commands
```bash
# Check status
pm2 status

# View logs
pm2 logs daily-activity-tracker

# Restart application
pm2 restart daily-activity-tracker

# Stop application
pm2 stop daily-activity-tracker
```

### Nginx Commands
```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Check status
sudo systemctl status nginx
```

## Troubleshooting

### Common Issues
1. **Port 3000 not accessible**: Check if PM2 process is running
2. **Nginx errors**: Verify configuration with `sudo nginx -t`
3. **Memory issues**: Check PM2 memory usage and restart if needed

### Log Locations
- **Application logs**: `./logs/` directory
- **PM2 logs**: `pm2 logs daily-activity-tracker`
- **Nginx logs**: `/var/log/nginx/`

## Security Considerations
- Firewall configured to allow only necessary ports
- Nginx as reverse proxy for additional security layer
- PM2 process isolation
- Regular system updates

## Backup and Recovery
- Application code: Git repository
- Environment variables: `.env` files
- PM2 configuration: `pm2 save`
- Database: Supabase (cloud-hosted)

## Support
For deployment issues, check:
1. PM2 process status
2. Application logs
3. Nginx configuration
4. System resources (CPU, memory, disk)
