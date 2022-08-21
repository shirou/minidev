/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    // buildExcludes: [/middleware-manifest\.json$/, /_buildManifest.js$/],
  },
  reactStrictMode: true,
  optimizeFonts: true,
  trailingSlash: true,
})