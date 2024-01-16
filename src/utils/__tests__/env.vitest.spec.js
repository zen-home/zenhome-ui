import { describe, it, expect } from 'vitest'
import { env } from 'src/utils/env.js'

describe('env', () => {
  it('should contain NODE_ENV property', () => {
    expect(env).toHaveProperty('NODE_ENV')
  })

  it('should get the correct NODE_ENV from process.env', () => {
    const originalNodeEnv = process.env.NODE_ENV

    // mock process.env.NODE_ENV for test purposes
    process.env.NODE_ENV = 'test'
    expect(env.NODE_ENV).toBe('test')

    // Restore original process.env
    process.env.NODE_ENV = originalNodeEnv
  })

  // Additional test cases can be added for different NODE_ENV values if needed
})
