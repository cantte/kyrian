/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ['@kyrian/eslint-config'], // uses the config in `packages/config/eslint`
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './apps/*/tsconfig.json',
      './packages/*/tsconfig.json',
    ],
  },
  settings: {
    next: {
      rootDir: ['apps/web'],
    },
  },
}

module.exports = config
