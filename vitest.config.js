import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup-file.js',
    include: [
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    coverage: {
      provider: 'v8', // specify v8 as coverage provider
      reporter: ['lcov'], // specify the reporters you want to use
      // include all source files you want coverage for
      include: ['src/**/*.{js,ts,vue}'],
      // exclude files or directories from coverage
      exclude: [
        '**/node_modules/**',
        '**/vitest.config.{js,ts}',
        '**/*.spec.{js,ts}',
        '**/*.test.{js,ts}',
        'test/**'
      ],
      // additional v8 configuration options
      all: true, // include all files in coverage report, not just files that have been tested
      extension: ['.js', '.ts', '.vue'], // list of extensions that v8 will take into account for coverage
      reportsDirectory: 'coverage-unit' // the directory where coverage reports will be stored
    }
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.scss'
    }),
    jsconfigPaths()
  ]
})
