/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  output: "standalone", // ✅ Required for Render Deployment
};

export default nextConfig;
