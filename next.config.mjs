/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow simple <Image> usage without a loader server; we ship local assets.
    unoptimized: true,
  },
};

export default nextConfig;
