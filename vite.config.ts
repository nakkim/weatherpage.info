import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(),svgr()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
})