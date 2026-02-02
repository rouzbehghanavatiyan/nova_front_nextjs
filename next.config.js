/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // اضافه کردن images config برای حل مشکل sharp
  images: {
    unoptimized: true, // این خط مشکل sharp را حل می‌کند
  },
  
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;