/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {appDir: true},
  images: {
    domains: ['inside.thektteam.org', 'cdn.shopify.com'],
  },
  compiler: {
    styledComponents: true
  },
}


module.exports = nextConfig