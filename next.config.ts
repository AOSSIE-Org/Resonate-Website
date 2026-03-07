import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add specific domains here as needed
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.example.com',
      // },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
