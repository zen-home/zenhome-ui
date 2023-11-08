import { zenError } from './src/utils/error.js'
import { describe, it, expect, vi } from 'vitest'

describe('zenError', () => {
  it('should console.error when debug is true', () => {
    console.error = vi.fn() // Mock console.error
    const error = new Error('This is a test error')
    const config = { debug: true }

    zenError(error, config)

    expect(console.error).toHaveBeenCalledWith(error)
  })

  it('should not console.error when debug is false', () => {
    console.error = vi.fn() // Mock console.error
    const error = new Error('This is a test error')
    const config = { debug: false }

    zenError(error, config)

    expect(console.error).not.toHaveBeenCalled()
  })

  it('should not console.error when debug is undefined', () => {
    console.error = vi.fn() // Mock console.error
    const error = new Error('This is a test error')

    zenError(error)

    expect(console.error).not.toHaveBeenCalled()
  })

  it('should send email when send is true', () => {
    const sendMock = vi.fn()
    vi.mock('@zenclabs/zenmail', () => ({
      send: sendMock
    }))

    const error = new Error('This is a test error')
    const config = { send: true }

    zenError(error, config)

    expect(sendMock).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Error',
      text: error.message,
      html: error.stack
    })

    vi.resetModules() // Reset the mocked module
  })

  it('should not send email when send is false', () => {
    const sendMock = vi.fn()
    vi.mock('@zenclabs/zenmail', () => ({
      send: sendMock
    }))

    const error = new Error('This is a test error')
    const config = { send: false }

    zenError(error, config)

    expect(sendMock).not.toHaveBeenCalled()

    vi.resetModules() // Reset the mocked module
  })

  it('should not send email when send is undefined', () => {
    const sendMock = vi.fn()
    vi.mock('@zenclabs/zenmail', () => ({
      send: sendMock
    }))

    const error = new Error('This is a test error')

    zenError(error)

    expect(sendMock).not.toHaveBeenCalled()

    vi.resetModules() // Reset the mocked module
  })
})
