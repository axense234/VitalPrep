/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: false,
  distDir: "build",
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  cleanupOutdatedCaches: true,
  register: true,
});

const nextConfigWithPWA = withPWA(nextConfig);

// Wrapper Hell
module.exports = withNextIntl(nextConfigWithPWA);
