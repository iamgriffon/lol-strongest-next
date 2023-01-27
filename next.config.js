/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'default',
    domains: ['ddragon.leagueoflegends.com'],
  }
}

module.exports = nextConfig
