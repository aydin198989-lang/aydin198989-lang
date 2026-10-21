import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Относительные пути, чтобы сборка работала в подпапке GitHub Pages
  base: './',
  server: {
    port: 5173,
    host: true,
  },
})
