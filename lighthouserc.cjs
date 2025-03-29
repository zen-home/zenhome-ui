module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:2340/'],
      startServerCommand: 'npx @quasar/cli serve -p 2340 dist/spa'
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }], // Fail if performance score is below 0.9
        'categories:accessibility': ['error', { minScore: 0.9 }] // Fail if accessibility score is below 0.9
        // other assertions...
      }
    }
  }
}
