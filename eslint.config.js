import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'
import quasar from '@quasar/app-vite/eslint'
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import cypress from 'eslint-plugin-cypress'
import importPlugin from 'eslint-plugin-import'
import n from 'eslint-plugin-n'
import promise from 'eslint-plugin-promise'

export default [
  {
    ignores: [
      'dist/**',
      'src-capacitor/**',
      'src-cordova/**',
      '.quasar/**',
      'node_modules/**',
      'quasar.config.*.temporary.compiled*',
      '.DS_Store',
      '.thumbs.db',
      'src-cordova/node_modules/**',
      'src-cordova/platforms/**',
      'src-cordova/plugins/**',
      'src-cordova/www/**',
      'src-capacitor/www/**',
      'src-capacitor/node_modules/**',
      'npm-debug.log*',
      '.idea/**',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      '.env.local*',
      '.nyc_output/**',
      'coverage/**',
      '.todo/**',
      '.lighthouseci/**',
      '.scannerwork/**',
      'sonar-project.properties',
      'docs/**',
      '.huskygpt_review.md',
      'coverage*'
    ]
  },

  ...quasar.configs.recommended(),
  js.configs.recommended,
  ...vue.configs['flat/essential'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
        ga: 'readonly',
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly',
        browser: 'readonly',
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        window: 'readonly'
      }
    },
    plugins: {
      cypress,
      import: importPlugin,
      n,
      promise
    },
    rules: {
      'prefer-promise-reject-errors': 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      
      // Import plugin rules
      'import/first': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      
      // Promise plugin rules
      'promise/param-names': 'error',
      'promise/no-return-wrap': 'error',
      
      // Node plugin rules
      'n/no-deprecated-api': 'error',
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off'
    }
  },

  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}', '**/*.cy.{js,jsx,ts,tsx}'],
    plugins: {
      cypress
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        window: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'off',
      'cypress/no-pause': 'error',
      'import/named': 'off'
    }
  },

  {
    files: [
      'src/**/*.vitest.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'test/vitest/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        window: 'readonly',
        global: 'readonly',
        Cypress: 'readonly',
        cy: 'readonly'
      }
    },
    rules: {
      'import/named': 'off'
    }
  },

  prettierSkipFormatting
] 