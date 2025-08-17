# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment
- [ ] AWS EC2 instance launched (wxadmin 20.04+)
- [ ] Security group allows ports 22, 80, 443
- [ ] SSH key pair created and downloaded
- [ ] Domain name configured (optional)

## 🔧 Server Setup
- [ ] SSH into EC2: `ssh -i key.pem wxadmin@your-ip`
- [ ] Upload `ec2-setup.sh` to EC2
- [ ] Run: `chmod +x ec2-setup.sh && ./ec2-setup.sh`
- [ ] Verify Node.js, PM2, Nginx installed

## 📦 Application Deployment
- [ ] Upload project: `scp -r ./daily-activity-tracker wxadmin@your-ip:/home/wxadmin/`
- [ ] SSH into EC2 and navigate to project directory
- [ ] Install dependencies: `npm install --production`
- [ ] Copy environment file: `cp env.production .env.production`
- [ ] Run deployment: `chmod +x deploy.sh && ./deploy.sh`

## 🌐 Verification
- [ ] Check PM2 status: `pm2 status`
- [ ] Check logs: `pm2 logs daily-activity-tracker`
- [ ] Access app: `http://your-ec2-ip`
- [ ] Test all functionality

## 🔒 SSL Setup (Optional)
- [ ] Update Nginx config with domain
- [ ] Run: `sudo certbot --nginx -d yourdomain.com`
- [ ] Test HTTPS access

## 📊 Monitoring
- [ ] Set up log rotation
- [ ] Monitor memory usage
- [ ] Set up alerts (optional)

---

**Deployment Files Created:**
- `ec2-setup.sh` - Server setup script
- `deploy.sh` - Application deployment script
- `ecosystem.config.js` - PM2 configuration
- `env.production` - Production environment variables
- `DEPLOYMENT.md` - Detailed deployment guide
