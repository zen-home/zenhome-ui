import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages,
  globalInjection: true,
  allowComposition: true,
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  silentFallbackWarn: true
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})

// Export i18n instance for use in other files
export { i18n }
