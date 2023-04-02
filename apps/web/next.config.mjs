/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@kyrian/ui', '@kyrian/auth', '@kyrian/db'],
}

export default config
