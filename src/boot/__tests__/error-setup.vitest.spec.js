import { describe, it, expect, vi } from 'vitest'
import { ZCatch } from 'src/utils/z-catch'
import { ZError } from 'src/utils/z-error'
import boot from 'src/boot/error-setup'

vi.mock('src/utils/z-catch', () => ({
  ZCatch: { addTransport: vi.fn() }
}))

vi.mock('src/utils/z-error', () => ({
  ZError: { transports: { LOG: 'log' } }
}))

describe('error-setup boot file', () => {
  it('should add transport to ZCatch', async () => {
    console.error = vi.fn()
    await boot()

    expect(ZCatch.addTransport).toHaveBeenCalledOnce()

    const transportConfig = ZCatch.addTransport.mock.calls[0][0]()
    expect(transportConfig.transport).toBe(ZError.transports.LOG)

    // Create a fake error to test the transport function
    const error = new Error('Test error')
    transportConfig.fn(error)

    expect(console.error).toHaveBeenCalledWith(error)
  })
})
