/** @type {import('next').NextConfig} */
const nextConfig = {

   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: '*'
      },
    ]
  }
}

module.exports = nextConfig
