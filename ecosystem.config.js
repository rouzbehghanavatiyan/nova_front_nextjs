module.exports = {
  apps: [
    {
      name: "nova-front",                  // نام برنامه
      cwd: "/var/www/nova_front_nextjs",   // مسیر پروژه
      script: "node_modules/next/dist/bin/next",  // اجرای next.js
      args: "start -p 3000 -H 0.0.0.0",               // پورت
      instances: 1,                         // فقط 1 instance → فشار کم به CPU
      exec_mode: "fork",                     // امن‌ترین حالت
      autorestart: true,                     // اگر crash شد restart شود
      max_restarts: 5,                       // حداکثر تعداد restart
      restart_delay: 5000,                   // 5 ثانیه بین restart ها
      watch: false,                          // watch خاموش → فشار کمتر
      env: {
        NODE_ENV: "production",
        NEXT_IGNORE_ESLINT: "true",
        NEXT_TELEMETRY_DISABLED: "1",
      }
    }
  ]
};



