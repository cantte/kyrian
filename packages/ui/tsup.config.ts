import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: false,
  splitting: true,
  entry: ['src/**/*.tsx', 'src/**/*.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  // include 'use client' in the output
  banner: {
    js: "'use client';",
  },
  keepNames: true,
  external: ['react'],
  ...options,
}))
