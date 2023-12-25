import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(),svgr()],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
})