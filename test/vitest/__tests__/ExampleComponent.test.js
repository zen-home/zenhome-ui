import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Quasar } from 'quasar'
import ExampleComponent from './demo/ExampleComponent.vue'

// Create a custom Quasar plugin
const quasarPlugin = {
  install(app) {
    app.use(Quasar, {
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

describe('example Component', () => {
  it('should mount component with todos', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        totalCount: 4,
        todos: [
          { id: 1, content: 'Hallo' },
          { id: 2, content: 'Hoi' }
        ]
      },
      global: {
        plugins: [quasarPlugin]
      }
    })
    expect(wrapper.vm.clickCount).toBe(0)
    wrapper.find('.q-item').trigger('click')
    expect(wrapper.vm.clickCount).toBe(1)
  })

  it('should mount component without todos', () => {
    const wrapper = mount(ExampleComponent, {
      props: {
        title: 'Hello',
        totalCount: 4
      },
      global: {
        plugins: [quasarPlugin]
      }
    })
    expect(wrapper.findAll('.q-item')).toHaveLength(0)
  })
})
