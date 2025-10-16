/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['192.168.1.189'], 
    unoptimized: true // اگر مشکل بهینه سازی دارید
  },
}
module.exports = nextConfig;
