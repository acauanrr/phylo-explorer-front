/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  assetPrefix: "/phylo",
  publicRuntimeConfig: {
    basePath: "/phylo",
  },
};

module.exports = nextConfig;
