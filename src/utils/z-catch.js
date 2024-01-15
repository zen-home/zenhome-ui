import { ZError } from './z-error'

/**
 * The `ZCatch` class is designed for error handling and processing.
 * It creates an instance of `zError` for any caught error and
 * passes this enhanced error object to a series of transport functions
 * for logging, reporting, or other forms of error processing.
 *
 * @class
 */
export class ZCatch {
  /**
   * Constructs an instance of `ZCatch`, creating a `zError` object
   * from the given input and passing it to registered transport functions.
   *
   * @param {Error|Object} input - The original error instance or an object representing error data.
   * @param {Object} [config] - Additional configuration for the `zError` instance.
   */
  constructor (input, config) {
    console.log('ZCatch config', config)
    if (!(input instanceof ZError)) {
      // defaults to LOG transport if none is provided
      if (!config || !config.transports) {
        config = config || {}
        config.transports = [ZCatch.defaultTransport]
      }
      this.error = new ZError(input, config)
    } else {
      if (!input.transports) input.transports = ZCatch.defaultTransport
      this.error = input
    }

    console.log('ZCatch error', this.error)
    // Ensure that transports are processed if they are available
    if (ZCatch.transports && ZCatch.transports.length) {
      ZCatch.transports.forEach(transport => {
        if (!transport || !transport.fn) return
        // only call the transport function if the error.transportType prop matches the transport.transportType prop
        if (!this.error.transports.includes(transport.transportType) && !this.error.transports.includes('All')) return
        transport.fn(this.error)
      })
    }
  }

  /**
   * Adds a new transport (plugin) to the error handling system.
   * Each transport is a function that will be called with the `zError` instance.
   *
   * @param {Function} transport - The transport function to handle the error.
   * @static
   */
  static addTransport (transport) {
    console.log('ZCatch.addTransport', transport)
    if (typeof transport === 'function') { transport = transport() }
    if (!transport.transportType) throw new Error('Transport must have a transportType property eg: ZError.transports.LOG')

    ZCatch.transports.push(transport)
  }

  static setDefaultTransport (transport) {
    ZCatch.defaultTransport = transport
  }
}

// Initialize the static transports array
ZCatch.transports = []
ZCatch.defaultTransport = ZError.transports.LOG
