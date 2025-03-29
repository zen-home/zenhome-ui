import { mount } from '@vue/test-utils'
import { Quasar, Notify } from 'quasar'
import { describe, expect, it, vi } from 'vitest'
import NotifyComponent from './demo/NotifyComponent.vue'

// Create a custom Quasar plugin with Notify
const quasarPlugin = {
  install(app) {
    app.use(Quasar, {
      plugins: {
        Notify
      },
      config: {
        brand: {
          primary: '#1976D2',
          secondary: '#26A69A',
          accent: '#9C27B0',
          dark: '#1d1d1d'
        }
      }
    })
  }
}

describe('notify example', () => {
  it('should call notify on click', async () => {
    expect(NotifyComponent).toBeTruthy()

    const wrapper = mount(NotifyComponent, {
      global: {
        plugins: [quasarPlugin]
      }
    })
    const spy = vi.spyOn(Notify, 'create')
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
