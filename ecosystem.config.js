module.exports = {
  apps: [
    {
      name: 'daily-activity-tracker',
      script: './start.sh',
      cwd: '/home/ubuntu/daily-activity-tracker',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/ubuntu/daily-activity-tracker/logs/err.log',
      out_file: '/home/ubuntu/daily-activity-tracker/logs/out.log',
      log_file: '/home/ubuntu/daily-activity-tracker/logs/combined.log',
      time: true
    }
  ]
};
