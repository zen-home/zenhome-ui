const registerCodeCoverageTasks = require('@cypress/code-coverage/task');
const { injectQuasarDevServerConfig } = require('@quasar/quasar-app-extension-testing-e2e-cypress/cct-dev-server');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  video: true,
  experimentalWebKitSupport: true,
  e2e: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      config.browsers = [
        ...config.browsers,
        // {
        //   name: 'webkit',
        //   channel: 'stable',
        //   family: 'webkit',
        //   displayName: 'Webkit',
        //   version: '16.5.1',
        //   path: '/Applications/Safari.app/Contents/MacOS/SafariForWebKitDevelopment',
        //   majorVersion: 16
        // }
      ]
      return config;
    },
    baseUrl: 'https://localhost:2340/',
    hosts: {
      'my-secure-site': "127.0.0.1"
    },
    supportFile: 'test/cypress/support/e2e.js',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
    supportFile: 'test/cypress/support/component.js',
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    indexHtmlFile: 'test/cypress/support/component-index.html',
    devServer: injectQuasarDevServerConfig(),
  },
});
