/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "firebasestorage.googleapis.com" }],
    unoptimized: true,
  },
};

export default nextConfig;
