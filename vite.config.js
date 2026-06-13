import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'frontend',           // <-- add this
  build: {
    outDir: '../dist',        // <-- output to root dist/ for Vercel
    emptyOutDir: true,
  },
})
