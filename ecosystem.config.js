module.exports = {
  apps: [
    {
      name: "nova-front",                  
      cwd: "/var/www/nova_front_nextjs",   
      script: "node_modules/next/dist/bin/next",  
      args: "start -p 3000 -H 0.0.0.0",               
      instances: 1,                         
      exec_mode: "fork",                     
      autorestart: true,                     
      max_restarts: 5,                       
      restart_delay: 5000,                   
      watch: false,                          
      env: {
        NODE_ENV: "production",
        NEXT_IGNORE_ESLINT: "true",
        NEXT_TELEMETRY_DISABLED: "1",
      }
    }
  ]
};