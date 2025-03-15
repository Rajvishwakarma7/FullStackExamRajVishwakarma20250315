/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // ✅ Required for Netlify (Replaces next export)
};

export default nextConfig;
