/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "../../dist",
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    config.resolve.fallback = { "pino-pretty": false, lokijs: false };

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
