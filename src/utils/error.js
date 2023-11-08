window.send = window.send || function () { }
export const zenError = (error, config = {}) => {
  if (config.debug) {
    console.error(error)
  }
  if (config.send) {
    // fake module
    window.send({
      to: 'test@example.com',
      subject: 'Error',
      text: error.message,
      html: error.stack
    })
  }
}
