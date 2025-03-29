import { describe, it, expect, vi, beforeEach } from 'vitest'

import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import boot from 'src/boot/i18n'

vi.mock('vue-i18n')

describe('i18n boot file', () => {
  beforeEach(() => {
    const mockI18n = {
      global: {
        locale: 'en-US',
        messages
      }
    }
    vi.mocked(createI18n).mockReturnValue(mockI18n)
  })

  it('should create i18n and install it into app', () => {
    const app = { use: vi.fn() }
    
    boot({ app })

    expect(createI18n).toHaveBeenCalledWith({
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

    // Get the actual mock instance that was passed to app.use
    const mockInstance = vi.mocked(createI18n).mock.results[0].value
    expect(app.use).toHaveBeenCalledWith(mockInstance)
  })
})
