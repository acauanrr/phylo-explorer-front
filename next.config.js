/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  assetPrefix: process.env.NODE_ENV === "production" ? "/phylo" : "",
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === "production" ? "/phylo" : "",
  },
};

module.exports = nextConfig;
