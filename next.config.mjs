/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable server components (already enabled by default in Next.js 13+)
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Allow Node.js modules in the browser
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
