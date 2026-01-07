/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // تنظیم برای خواندن عکس‌ها اگر از کامپوننت <Image /> استفاده می‌کنید
  images: {
    domains: ['greatnovatools.ir'],
    remotePatterns: [
      {
        protocol: 'http', // یا https در صورت داشتن SSL
        hostname: 'greatnovatools.ir',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },

  // هدایت درخواست‌های API به سمت NestJS
  // این بخش عمدتا برای محیط لوکال مفید است، اما ساختار را حفظ می‌کند
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*', // آدرس بکند شما
      },
    ];
  },
};

module.exports = nextConfig;