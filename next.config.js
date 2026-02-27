/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/npm/tarot-card-img@0.1.0/**",
      },
    ],
  },
};

module.exports = nextConfig;
