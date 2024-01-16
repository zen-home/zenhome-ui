import routes from 'src/router/routes'
import { describe, it, expect } from 'vitest'

describe('routes', () => {
  it('should contain root path with MainLayout', () => {
    expect(routes[0].path).toBe('/')
    expect(routes[0].component).toBeInstanceOf(Function)
  })

  it('should have a child route for root path with IndexPage', () => {
    expect(routes[0].children).toBeInstanceOf(Array)
    expect(routes[0].children).toHaveLength(1)
    expect(routes[0].children[0].path).toBe('')
    expect(routes[0].children[0].component).toBeInstanceOf(Function)
  })

  it('should contain catch-all route for ErrorNotFound page', () => {
    const lastIndex = routes.length - 1
    expect(routes[lastIndex].path).toBe('/:catchAll(.*)*')
    expect(routes[lastIndex].component).toBeInstanceOf(Function)
  })
})
