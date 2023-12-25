import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    specPattern: 'src/weathermap-e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
  },
})