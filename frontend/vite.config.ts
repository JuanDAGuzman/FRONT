import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    // Evita Lightning CSS para los transform (usa PostCSS/Tailwind)
    transformer: 'postcss',
  },
  base: '/',
  server: { open: true },
  build: {
    outDir: 'dist',
    // Minificador de CSS: usa esbuild (no lightningcss)
    cssMinify: 'esbuild',
  },
})
