module.exports = {
  apps: [
    {
      name: 'test-vue-pulpo',
      script: 'npm run dev',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: 'production',
      },
      error_file: './logs/test-vue-pulpo-error.log',
      out_file: './logs/test-vue-pulpo-out.log',
      log_file: './logs/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      time: true,
    },
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
