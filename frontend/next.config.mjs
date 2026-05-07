/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Rewrites don't work with static export, but we keep them for dev mode
  // In production, API calls go directly to the backend
  trailingSlash: true,
};

export default nextConfig;
