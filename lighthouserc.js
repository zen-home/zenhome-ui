module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:2345/'],
      startServerCommand: 'npx @quasar/cli serve -p 2345 dist/spa'
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
