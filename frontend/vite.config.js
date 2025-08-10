import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.railway.app',  // Allow all Railway domains
      'surprising-rejoicing-production.up.railway.app'  // Your specific domain
    ]
  },
  build: {
    outDir: 'dist'
  }
})