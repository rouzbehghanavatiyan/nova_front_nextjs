const nextConfig = {
  reactStrictMode: true,

  // images: {
  //   domains: ["greatnovatools.ir"],
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "greatnovatools.ir",
  //       port: "",
  //       pathname: "/storage/**",
  //     },
  //   ],
  // },
  images: {
    unoptimized: true,
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
