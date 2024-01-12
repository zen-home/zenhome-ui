import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import jsconfigPaths from 'vite-jsconfig-paths'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  },
  server: {
    https: {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    }
  },
  test: {
    environment: 'happy-dom',
    setupFiles: 'test/vitest/setup-file.js',
    include: [
      // Matches vitest tests in any subfolder of 'src' or into 'test/vitest/__tests__'
      // Matches all files with extension 'js', 'jsx', 'ts' and 'tsx'
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    coverage: {
      provider: 'v8', // specify v8 as coverage provider
      reporter: ['lcov', 'html', 'json-summary'], // specify the reporters you want to use
      // include all source files you want coverage for
      include: ['src/**/*.{js,ts,vue}'],
      // exclude files or directories from coverage
      exclude: [
        '**/__tests__/**',
        '**/src/components/**',
        '**/src/layouts/**',
        '**/src/pages/**',
        '**/node_modules/**',
        '**/vitest.config.{js,ts}',
        '**/*.spec.{js,ts}',
        '**/*.test.{js,ts}',
        'test/**'
      ],
      // additional v8 configuration options
      all: true, // include all files in coverage report, not just files that have been tested
      extension: ['.js', '.vue'], // list of extensions that v8 will take into account for coverage
      reportsDirectory: 'coverage-unit' // the directory where coverage reports will be stored
    }
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: 'src/quasar-variables.scss' }),
    jsconfigPaths()
  ]
})
