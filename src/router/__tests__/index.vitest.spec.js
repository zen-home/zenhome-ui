import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRouter, createMemoryHistory } from 'vue-router'
import route from 'src/router'

vi.mock('vue-router', () => ({
  createRouter: vi.fn(),
  createMemoryHistory: vi.fn(() => ({})),
  createWebHistory: vi.fn(() => ({})),
  createWebHashHistory: vi.fn(() => ({}))
}))

vi.mock('src/utils/z-catch', () => ({
  ZCatch: vi.fn()
}))

vi.mock('src/router/routes', () => ({
  default: []
}))

describe('router index', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create a router with memory history in SSR mode', () => {
    process.env.SERVER = true
    route()
    expect(createMemoryHistory).toHaveBeenCalledTimes(1)
    expect(createRouter).toHaveBeenCalled()
  })

  it('should create a router with web history when VUE_ROUTER_MODE equals "history"', () => {
    delete process.env.SERVER
    process.env.VUE_ROUTER_MODE = 'history'
    route()
    expect(createRouter).toHaveBeenCalled()
  })

  it('should call ZCatch when an error occurs during router creation', () => {
    createRouter.mockImplementationOnce(() => {
      throw new Error('Router creation failed')
    })
    route()
    expect(createRouter).toHaveBeenCalled()
  })

  it('should create a router with web hash history when VUE_ROUTER_MODE does not equal "history"', () => {
    delete process.env.SERVER
    process.env.VUE_ROUTER_MODE = 'not-history'
    route()
    expect(createRouter).toHaveBeenCalled()
  })
})
