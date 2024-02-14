/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@kyrian/auth', '@kyrian/db'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kyrian-event-images.s3.us-east-2.amazonaws.com',
      }
    ]
  }
}

export default config
