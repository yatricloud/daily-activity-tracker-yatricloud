# 🚀 EC2 Deployment Guide for Daily Activity Tracker

This guide will help you deploy your Daily Activity Tracker application on AWS EC2.

## 📋 Prerequisites

- AWS EC2 instance running wxadmin 20.04 or later
- EC2 instance with at least 1GB RAM and 10GB storage
- Security group configured to allow HTTP (80), HTTPS (443), and SSH (22)
- Domain name (optional, for SSL)

## 🖥️ Step 1: Launch EC2 Instance

1. **Launch EC2 Instance:**
   - AMI: wxadmin Server 20.04 LTS (HVM)
   - Instance Type: t2.micro (free tier) or t3.small
   - Storage: 10GB GP2
   - Security Group: Allow SSH (22), HTTP (80), HTTPS (443)

2. **Connect to your instance:**
   ```bash
   ssh -i your-key.pem wxadmin@your-ec2-public-ip
   ```

## ⚙️ Step 2: Server Setup

1. **Run the setup script:**
   ```bash
   # Upload the ec2-setup.sh file to your EC2 instance
   chmod +x ec2-setup.sh
   ./ec2-setup.sh
   ```

   This script will:
   - Update system packages
   - Install Node.js 18.x
   - Install PM2 (process manager)
   - Install and configure Nginx
   - Install Certbot for SSL
   - Configure firewall

## 📦 Step 3: Deploy Application

1. **Upload your application:**
   ```bash
   # From your local machine, upload the project
   scp -r -i your-key.pem ./daily-activity-tracker wxadmin@your-ec2-public-ip:/home/wxadmin/
   ```

2. **SSH into your EC2 instance:**
   ```bash
   ssh -i your-key.pem wxadmin@your-ec2-public-ip
   ```

3. **Navigate to the application directory:**
   ```bash
   cd /home/wxadmin/daily-activity-tracker
   ```

4. **Install dependencies:**
   ```bash
   npm install --production
   ```

5. **Set up environment variables:**
   ```bash
   # Copy your .env.local to .env.production
   cp .env.local .env.production
   
   # Edit the production environment file
   nano .env.production
   ```

6. **Run the deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## 🌐 Step 4: Access Your Application

1. **Check if the application is running:**
   ```bash
   pm2 status
   pm2 logs daily-activity-tracker
   ```

2. **Access your application:**
   - Open your browser and go to: `http://your-ec2-public-ip`
   - The application should be running on port 3000

## 🔒 Step 5: SSL Certificate (Optional)

If you have a domain name:

1. **Update Nginx configuration with your domain:**
   ```bash
   sudo nano /etc/nginx/sites-available/daily-activity-tracker
   # Change server_name _; to server_name yourdomain.com;
   ```

2. **Get SSL certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

## 📊 Step 6: Monitoring and Maintenance

1. **Check application status:**
   ```bash
   pm2 status
   pm2 logs daily-activity-tracker
   ```

2. **Restart application:**
   ```bash
   pm2 restart daily-activity-tracker
   ```

3. **Update application:**
   ```bash
   # Pull latest changes
   git pull origin main
   
   # Rebuild and restart
   npm run build
   pm2 restart daily-activity-tracker
   ```

## 🚨 Troubleshooting

1. **Application not starting:**
   ```bash
   pm2 logs daily-activity-tracker
   # Check for errors in the logs
   ```

2. **Nginx issues:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Port conflicts:**
   ```bash
   sudo netstat -tlnp | grep :3000
   ```

4. **Memory issues:**
   ```bash
   free -h
   # Consider upgrading instance type if needed
   ```

## 📝 Environment Variables

Make sure to set these in your `.env.production` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=production
```

## 🔄 Auto-deployment with GitHub Actions (Optional)

You can set up GitHub Actions for automatic deployment:

1. Add your EC2 instance's SSH key to GitHub Secrets
2. Create `.github/workflows/deploy.yml`
3. Configure automatic deployment on push to main branch

## 📞 Support

If you encounter issues:
1. Check the logs: `pm2 logs daily-activity-tracker`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify all services are running: `sudo systemctl status nginx`

---

**Happy Deploying! 🎉**
