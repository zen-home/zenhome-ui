/**
 * @fileoverview This module provides an object containing environment variables.
 */

/**
 * An object containing environment variables.
 * @typedef {Object} Env
 * @property {string} NODE_ENV - The current Node.js environment. Typically one of "development", "production", or "test".
 */

/**
 * The `env` object containing environment variables.
 * @type {Env}
 * @example
 * // Accessing the Node.js environment variable
 * const environment = env.NODE_ENV;  // "development", "production", or "test"
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV
}
