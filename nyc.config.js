module.exports = {
  extends: '@quasar/quasar-app-extension-testing-e2e-cypress/nyc-config-preset',
  'report-dir': process.env.TEST_TYPE === 'component' ? 'coverage-component' : 'coverage-e2e',
  reporter: [
    'lcov'
  ]
}
