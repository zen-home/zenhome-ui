import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from 'src/App.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('App.vue', () => {
  it('renders router-view', () => {
    // Create a mock router
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [] // Define your routes or leave empty for testing purposes
    })

    // Mount the component
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    // Assert that the router-view is rendered
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })
})
