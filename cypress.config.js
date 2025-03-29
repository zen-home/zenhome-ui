import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: '0'
  }
}) 