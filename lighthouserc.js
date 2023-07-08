module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4000/'],
      startServerCommand: 'yarn dlx @quasar/cli serve dist/spa',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }], // Fail if performance score is below 0.9
        'categories:accessibility': ['error', { minScore: 0.9 }], // Fail if accessibility score is below 0.9
        // other assertions...
      },
    },
  },
};
