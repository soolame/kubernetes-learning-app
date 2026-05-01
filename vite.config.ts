import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  // For GitHub Pages: Set to '/<repo-name>/' or '/' if using custom domain
  // Example: base: '/kubernetes-learning-app/'
  base: process.env.GITHUB_PAGES ? '/kubernetes-learning-app/' : '/',
  css: {
    postcss: './postcss.config.mjs',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
