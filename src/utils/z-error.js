/**
 * `ZError` is an extension of the native JavaScript `Error` class.
 * It provides enhanced error handling capabilities by allowing additional
 * contextual information to be passed and processed. This class is designed
 * to work both in browser and Node.js environments. It allows for detailed
 * categorization and handling of errors.
 *
 * @class
 * @extends Error
 */
export class ZError extends Error {
  /**
   * Creates an instance of `ZError`.
   *
   * @param {Error|Object} input - An Error instance or an object representing error configuration.
   *                               If an Error instance is passed, its message and stack are used.
   *                               If an object is passed, it is treated as the error configuration.
   * @param {Object} [config={}] - Additional configuration for the error. Used only if the first parameter is an Error instance.
   * @param {string} config.message - Error message.
   * @param {number} [config.statusCode=null] - HTTP status code associated with the error, if applicable.
   * @param {string} [config.level=level.ERROR] - Severity level of the error. Must be one of the values in ZError.level.
   * @param {string} [config.importance=importance.LOW] - The importance of the error. Must be one of the values in ZError.importanceLevel.
   * @param {string} [config.transports=transports.LOG] - The transports of the error. Must be one of the values in ZError.transports.
   * @param {string} [config.stack] - Stack trace of the error.
   * @param {string} [config.title] - A title for the error, useful for displaying error information in UIs.
   * @param {string} [config.body] - A detailed error body or description.
   * @param {string} [config.href] - URL where the error occurred. In a browser environment, defaults to the current window's location.
   * @param {string} [config.userId] - Identifier for the user experiencing the error.
   * @param {string} [config.friendlyMessage] - A user-friendly error message.
   *
   * @throws {TypeError} Throws a TypeError if the config parameter is not an object.
   *
   * @example
   * // Creating a ZError with an error instance
   * try {
   *   // code that may throw an error
   * } catch (error) {
   *   throw new ZError(error, { userId: 'user123', title: 'Unexpected Error', friendlyMessage: 'Oops! Something went wrong.' });
   * }
   *
   * @example
   * // Creating a ZError with a configuration object
   * throw new ZError({ message: 'Invalid input', statusCode: 400, level: 'WARN', title: 'Input Error' });
   */
  constructor (input, config = {}) {
    if (typeof config !== 'object') {
      throw new TypeError('Config must be an object')
    }

    if (input instanceof Error) {
      config.message = input.message
      config.stack = input.stack
      config.level = config.level || 'Error' // Use existing level if provided, else default to 'Error'
    } else if (typeof input === 'object') {
      config = input
    }
    if (config.transports && !Array.isArray(config.transports)) {
      throw new TypeError('Transports must be an array')
    }

    super(config.message)
    this.statusCode = config.statusCode || null
    this.stack = config.stack || this.stack
    this.title = config.title
    this.body = config.body
    this.level = config.level || 'Error'
    this.importance = config.importance || 'Low'
    console.log(config.transports)
    this.transports = config.transports || [ZError.transports.LOG]

    // Only use captureStackTrace if it's available (Node.js specific)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ZError)
    }

    // Set href based on environment: browser or Node.js
    if (typeof window !== 'undefined' && window.location) {
      this.href = config.href || window.location.href
    } else {
      this.href = config.href
    }

    this.userId = config.userId
    this.friendlyMessage = config.friendlyMessage || config.message

    return this
  }
}

ZError.level = {
  ERROR: 'Error',
  DEBUG: 'Debug',
  WARNING: 'Warning',
  INFO: 'Info'
}

ZError.importance = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
  BLOCKER: 'Blocker'
}

ZError.transports = {
  LOG: 'Log',
  REPORT: 'Report',
  NOTIFY: 'Notify',
  REDIRECT: 'Redirect',
  RETRY: 'Retry'
}
