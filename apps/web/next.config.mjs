/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@kyrian/ui'],
}

export default config
