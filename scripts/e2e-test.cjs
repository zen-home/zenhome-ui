/* eslint-disable no-console */
const fetch = require('node-fetch')
const { exec } = require('child_process')

// Arguments
const serverUrl = 'http://127.0.0.1:2340'
const cypressCommand = process.argv[2] || 'cypress run --e2e' // Default to 'cypress run' if not specified

// Timing Configuration
const interval = 2000 // Interval in milliseconds to wait between checks
const timeout = 300000 // Maximum amount of time to wait for the server to be ready

let elapsedTime = 0
const serverCheckInterval = setInterval(checkServerReady, interval)

function runCypressCommand () {
  exec(cypressCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.error(`stderr: ${stderr}`)
  })
}

function checkServerReady () {
  fetch(serverUrl)
    .then(response => {
      if (response.ok) {
        console.log('Server is ready. Proceeding to run Cypress.')
        clearInterval(serverCheckInterval) // Clear interval before running the command
        runCypressCommand()
      } else {
        console.log(`Server not ready. Status code: ${response.status}`)
      }
    })
    .catch(error => {
      console.log('Error connecting to server:', error.message)
    })

  elapsedTime += interval
  if (elapsedTime >= timeout) {
    console.log('Timeout reached. Server did not become ready in time.')
    clearInterval(serverCheckInterval) // Make sure to clear here as well
    process.exit(1) // Exit with an error code
  }
}
