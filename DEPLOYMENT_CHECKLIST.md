# Deployment Checklist

## Pre-Deployment Checklist

### ✅ Environment Setup
- [ ] EC2 instance running Ubuntu 20.04+
- [ ] SSH access configured
- [ ] Security groups configured (ports 22, 80, 443)
- [ ] Sufficient disk space (>5GB free)
- [ ] Sufficient memory (>2GB RAM)

### ✅ Dependencies Installation
- [ ] Node.js 18.x installed
- [ ] npm installed
- [ ] PM2 installed globally
- [ ] Nginx installed and configured
- [ ] Git installed
- [ ] Build essentials installed

### ✅ Application Preparation
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env` files)
- [ ] Application builds successfully (`npm run build`)
- [ ] All tests passing

## Deployment Checklist

### ✅ Initial Setup
- [ ] Run `ec2-setup.sh` script
- [ ] Verify Nginx configuration
- [ ] Test Nginx configuration (`sudo nginx -t`)
- [ ] Restart Nginx service
- [ ] Configure firewall rules

### ✅ Application Deployment
- [ ] Run `deploy.sh` script
- [ ] Verify PM2 process is running
- [ ] Check application logs for errors
- [ ] Verify application responds on port 3000
- [ ] Test Nginx reverse proxy

### ✅ Post-Deployment Verification
- [ ] Application accessible via HTTP (port 80)
- [ ] All routes working correctly
- [ ] Database connections successful
- [ ] Authentication working
- [ ] File uploads working (if applicable)

## SSL Configuration (Optional)

### ✅ SSL Setup
- [ ] Domain name configured
- [ ] DNS pointing to EC2 instance
- [ ] Certbot installed
- [ ] SSL certificate obtained
- [ ] Nginx configured for HTTPS
- [ ] HTTP to HTTPS redirect configured

## Monitoring Setup

### ✅ PM2 Configuration
- [ ] PM2 startup script configured
- [ ] PM2 configuration saved
- [ ] Log rotation configured
- [ ] Memory limits set appropriately

### ✅ Nginx Monitoring
- [ ] Access logs enabled
- [ ] Error logs enabled
- [ ] Log rotation configured
- [ ] Performance monitoring enabled

## Security Checklist

### ✅ Firewall Configuration
- [ ] Only necessary ports open (22, 80, 443)
- [ ] SSH key-based authentication enabled
- [ ] Root login disabled
- [ ] Fail2ban configured (optional)

### ✅ Application Security
- [ ] Environment variables secured
- [ ] API keys not exposed in code
- [ ] HTTPS enabled (if applicable)
- [ ] Regular security updates scheduled

## Maintenance Checklist

### ✅ Regular Tasks
- [ ] System updates scheduled
- [ ] Log rotation configured
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured
- [ ] Performance metrics tracked

### ✅ Troubleshooting Tools
- [ ] PM2 monitoring commands documented
- [ ] Nginx configuration testing documented
- [ ] Log analysis tools available
- [ ] Rollback procedures documented

## Rollback Plan

### ✅ Emergency Procedures
- [ ] PM2 restart procedures documented
- [ ] Nginx restart procedures documented
- [ ] Previous version deployment documented
- [ ] Database backup/restore procedures documented

## Documentation

### ✅ Complete Documentation
- [ ] Deployment guide updated
- [ ] Environment variables documented
- [ ] Troubleshooting guide created
- [ ] Maintenance procedures documented
- [ ] Contact information for support

---

**Note**: This checklist should be reviewed and updated regularly based on your specific deployment requirements and any issues encountered during deployment.
