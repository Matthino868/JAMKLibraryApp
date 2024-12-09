/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'],
    dangerouslyAllowSVG: true,
  }
};

module.exports = nextConfig;
