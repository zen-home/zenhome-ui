export const zenError = (error, config = {}) => {
  if (config.debug) {
    console.error(error)
  }
  if (config.send) {
    const { send } = require('@zenclabs/zenmail')
    send({
      to: 'test@example.com',
      subject: 'Error',
      text: error.message,
      html: error.stack
    })
  }
}
