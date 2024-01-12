import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ZCatch } from 'src/utils/z-catch'
import { ZError } from 'src/utils/z-error'

describe('ZCatch', () => {
  let originalTransportFn

  beforeEach(() => {
    ZCatch.transports = []
    originalTransportFn = vi.fn()
    ZCatch.addTransport(() => ({ fn: originalTransportFn, transport: ZError.transports.LOG }))
  })

  it('should create ZError on instantiation', () => {
    const input = new Error('Test error')
    const zCatch = new ZCatch(input)

    expect(zCatch.error).toBeInstanceOf(ZError)
  })

  it('should gracefully skip transports that are missing', () => {
    ZCatch.addTransport({
      transport: ZError.transports.LOG
    })
    const input = new Error('Test error')
    // eslint-disable-next-line no-new
    new ZCatch(input)

    expect(originalTransportFn).toHaveBeenCalledTimes(1)
  })

  it('should call registered transports with ZError', () => {
    const input = new Error('Test error')
    // eslint-disable-next-line no-new
    new ZCatch(input)

    expect(originalTransportFn).toHaveBeenCalledTimes(1)
    expect(originalTransportFn).toHaveBeenCalledWith(expect.any(ZError))
  })

  it('should not call transport if no transports are registered', () => {
    ZCatch.transports = []
    const input = new Error('Test error')
    const transportSpy = vi.fn()

    // eslint-disable-next-line no-new
    new ZCatch(input)

    expect(transportSpy).not.toHaveBeenCalled()
  })

  it('should process multiple transports', () => {
    const secondFn = vi.fn()
    ZCatch.addTransport(() => ({ fn: secondFn, transport: ZError.transports.LOG }))

    const input = new Error('Test error')
    // eslint-disable-next-line no-new
    new ZCatch(input)

    expect(originalTransportFn).toHaveBeenCalledTimes(1)
    expect(secondFn).toHaveBeenCalledTimes(1)
  })
})
