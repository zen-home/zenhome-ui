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
    this.error = new ZError(input, config)

    // Ensure that transports are processed if they are available
    if (ZCatch.transports && ZCatch.transports.length) {
      ZCatch.transports.forEach(transport => {
        if (!transport || !transport.fn) return
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
    if (typeof transport === 'function') {
      ZCatch.transports.push(transport())
    } else {
      ZCatch.transports.push(transport)
    }
  }

  // Other methods (serialize, sanitize, etc.) go here...
}

// Initialize the static transports array
ZCatch.transports = []
