import { ZError } from 'src/utils/z-error'
import { describe, it, expect } from 'vitest'

describe('ZError', () => {
  it('should be instance of Error', () => {
    const zError = new ZError('My error')
    expect(zError).toBeInstanceOf(Error)
  })

  it('should have a message when provided', () => {
    const errorMessage = 'My error message'
    const zError = new ZError({ message: errorMessage })
    expect(zError.message).toBe(errorMessage)
  })

  it('should use the message from an error instance', () => {
    const nativeError = new Error('Native error message')
    const zError = new ZError(nativeError)
    expect(zError.message).toBe(nativeError.message)
  })

  it('should have default property values', () => {
    const zError = new ZError('Default properties test')
    expect(zError.statusCode).toBe(null)
    expect(zError.level).toBe(ZError.level.ERROR)
    expect(zError.importance).toBe(ZError.importance.LOW)
    expect(zError.href).toBe(window.location.href)
    expect(zError.userId).toBe(undefined)
    expect(zError.friendlyMessage).toBe(undefined)
  })

  it('should work without window.location', () => {
    // Mock the global window object
    const originalWindow = global.window
    delete global.window

    const zError = new ZError('Default properties test')
    expect(zError.href).toBe(undefined)

    // Restore the original window object after the test
    global.window = originalWindow
  })

  it('throws a type error when transports is not an array', () => {
    expect(() => new ZError({ transports: 'not an array' })).toThrow(TypeError)
  })

  it('should use config provided properties', () => {
    const config = {
      message: 'Configured message',
      statusCode: 400,
      title: 'Config Error',
      body: 'Error body',
      level: ZError.level.WARNING,
      importance: ZError.importance.HIGH,
      transports: [ZError.transports.LOG],
      href: 'http://mylocation',
      userId: 'user123',
      friendlyMessage: 'Something went wrong'
    }
    const zError = new ZError(config)
    Object.keys(config).forEach((key) => {
      expect(zError[key]).toBe(config[key])
    })
  })

  it('should throw TypeError when config is not an object', () => {
    expect(() => new ZError('Throwing error', 'not an object')).toThrow(TypeError)
  })

  // ... additional tests that may handle specific paths like stack and environment-specific properties
})
