import { describe, it, expect, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import boot from 'src/boot/i18n'

vi.mock('vue-i18n')

describe('i18n boot file', () => {
  it('should create i18n and install it into app', () => {
    const app = { use: vi.fn() }
    const i18n = createI18n({
      locale: 'en-US',
      globalInjection: true,
      messages
    })

    boot({ app })

    expect(createI18n).toHaveBeenCalledWith({
      locale: 'en-US',
      globalInjection: true,
      messages
    })
    expect(app.use).toHaveBeenCalledWith(i18n)
  })
})
