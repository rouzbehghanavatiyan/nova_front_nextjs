/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {},
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
