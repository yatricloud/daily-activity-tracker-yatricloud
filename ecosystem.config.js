module.exports = {
  apps: [
    {
      name: 'daily-activity-tracker',
      script: './start.sh',
      cwd: '/home/ubuntu/workspace/yatri-3-tier-application',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/ubuntu/workspace/yatri-3-tier-application/logs/err.log',
      out_file: '/home/ubuntu/workspace/yatri-3-tier-application/logs/out.log',
      log_file: '/home/ubuntu/workspace/yatri-3-tier-application/logs/combined.log',
      time: true
    }
  ]
};
