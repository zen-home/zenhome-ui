import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { Notify } from 'quasar'
import NotifyComponent from './demo/NotifyComponent.vue'
import { globalPlugins } from './setup'

describe('notify example', () => {
  it('should call notify on click', async () => {
    expect(NotifyComponent).toBeTruthy()

    const wrapper = mount(NotifyComponent, {
      global: {
        plugins: globalPlugins
      }
    })
    const spy = vi.spyOn(Notify, 'create')
    expect(spy).not.toHaveBeenCalled()
    wrapper.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
})
