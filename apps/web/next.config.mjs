/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@kyrian/ui', '@kyrian/auth', '@kyrian/db'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    })

    return config
  },
}

export default config
