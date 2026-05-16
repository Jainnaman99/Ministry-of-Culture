import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the built dist/ works when opened via file:// (e.g. double-clicked index.html)
  base: './',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Dev server: proxy /api/* to the local Sanskriti Saathi backend (server/index.mjs).
  // In production this is replaced by VITE_API_BASE_URL pointing at the deployed Azure endpoint.
  server: {
    proxy: {
      '/chat-hybrid-context': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
