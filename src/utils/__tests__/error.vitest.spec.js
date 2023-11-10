import { zenError } from './src/utils/error.js'
import { describe, it, expect, vi } from 'vitest'

describe('zenError', () => {
  it('should console.error when debug is true', () => {
    const mockConsoleError = vi.fn()
    vi.spyOn(console, 'error').mockImplementation(mockConsoleError)
    const error = new Error('Test error')
    const config = { debug: true }

    zenError(error, config)

    expect(mockConsoleError).toHaveBeenCalledWith(error)
  })

  it('should not console.error when debug is false', () => {
    const mockConsoleError = vi.fn()
    vi.spyOn(console, 'error').mockImplementation(mockConsoleError)
    const error = new Error('Test error')
    const config = { debug: false }

    zenError(error, config)

    expect(mockConsoleError).not.toHaveBeenCalled()
  })

  it('should call window.send with correct parameters when send is true', () => {
    window.send = vi.fn()
    const error = new Error('Test error')
    const config = {
      send: true,
      to: 'test@example.com',
      subject: 'Error',
      text: error.message,
      html: error.stack
    }

    zenError(error, config)

    expect(window.send).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Error',
      text: error.message,
      html: error.stack
    })
  })

  it('should not call window.send when send is false', () => {
    window.send = vi.fn()
    const error = new Error('Test error')
    const config = { send: false }

    zenError(error, config)

    expect(window.send).not.toHaveBeenCalled()
  })

  // Cleanup mocks after all tests are done
  vi.restoreAllMocks()
})
