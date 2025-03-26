/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'example.com',
      'images.unsplash.com',
      'supabase.co',
      'localhost',
      '127.0.0.1',
      '*.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 