/* eslint-disable no-useless-escape */
const { exec, execSync } = require('child_process')
const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')

async function getChangedFiles () {
  const changed = execSync('git diff --name-only').toString().trim().split('\n')
  const untracked = execSync('git ls-files --others --exclude-standard').toString().trim().split('\n')
  return [...changed, ...untracked].filter(file => file.endsWith('.js'))
}

async function execAsync (command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

const escapeShellArg = (arg) => {
  // eslint-disable-next-line quotes
  return `'${arg.replace(/'/g, `'\\''`)}'`
}

async function main () {
  const files = await getChangedFiles()

  if (files.length === 0) {
    console.log('No JS files have been changed or are untracked.')
    return
  }

  const questions = [
    {
      type: 'checkbox',
      message: 'Select files:',
      name: 'selectedFiles',
      choices: files
    }
  ]

  const ora = (await import('ora')).default
  const inquirer = (await import('inquirer')).default

  const answers = await inquirer.prompt(questions)

  const fileContents = fs.readFileSync('scripts/testgpt.config.yaml', 'utf8')
  const data = yaml.load(fileContents)

  for (const file of answers.selectedFiles) {
    const spinner = ora(`Processing ${file}`).start()

    let testgptCommand = `testgpt -i ${file} -s`

    // Check if the extension exists in the YAML data
    const ext = '.' + file.split('.').pop()
    if (data[ext]) {
      const fileData = data[ext]
      if (fileData.techs) {
        testgptCommand += ` -t ${fileData.techs.join(',')}`
      }
      if (fileData.instructions) {
        testgptCommand += ` -n "${fileData.instructions}"`
      }
      if (fileData.examples) {
        // Assuming the examples would be a JSON string, but you can adjust this
        const jsonString = JSON.stringify(fileData.examples)
        const escapedJSONString = escapeShellArg(jsonString)
        testgptCommand += ` -x ${escapedJSONString}`
      }
      if (fileData.outputFile) {
        testgptCommand += ` -o ${fileData.outputFile}`
      }
      if (fileData.apiKey) {
        testgptCommand += ` -k ${fileData.apiKey}`
      }
      if (fileData.model) {
        testgptCommand += ` -m ${fileData.model}`
      }
      if (fileData.systemMessage) {
        testgptCommand += ` -y "${fileData.systemMessage}"`
      }
      if (fileData.promptTemplate) {
        testgptCommand += ` -p "${fileData.promptTemplate}"`
      }
      if (fileData.moduleEndpoint) {
        testgptCommand += ` -e ${fileData.moduleEndpoint}`
      }
    }

    // Safely move the file to __tests__ directory
    const fileDir = path.dirname(file)
    const testsDir = path.join(fileDir, '__tests__')

    const oldPath = file.replace('.js', '.test.js')
    const fileName = path.basename(oldPath)
    const newPath = path.join(testsDir, fileName.replace('.test.js', '.vitest.spec.js'))

    try {
      await execAsync(testgptCommand)

      if (!fs.existsSync(testsDir)) {
        fs.mkdirSync(testsDir, { recursive: true })
      }

      // check for any references to jest and if there are any replace them with vi
      const fileContents = fs.readFileSync(oldPath, 'utf8')
      let newFileContents = fileContents
        .replace(/jest\./g, 'vi.')
        .replace(/```.+/g, '')
        .replace(/```/g, '')
      if (!newFileContents.includes(' vi ') && newFileContents.includes('vi.')) {
        newFileContents = "import { vi } from 'vitest' \n" + newFileContents
      }

      fs.writeFileSync(oldPath, newFileContents, 'utf8')

      await execAsync(`mv ${oldPath} ${newPath}`)
      await execAsync(`npm run eslint -- --fix ${newPath}`)
      spinner.succeed(`Successfully processed ${file}`)
      console.log(`
======================================
Double check the tests its not perfect
======================================
`)
    } catch (error) {
      if (error.message.includes('npm run eslint')) {
        spinner.fail(`Failed to run eslint on ${newPath}`)
        console.log(`npm run eslint -- --fix ${newPath}`)
      } else {
        spinner.fail(`Failed to process ${file}`)
      }
      console.error(error.message)
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
