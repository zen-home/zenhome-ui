# Installation
###  Install the dependencies
```bash
npm  i
```

### Install quasar with
```bash
npm i -g @quasar/cli
```

# Commands
###  Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm  dev
```

###  SonarQube

make sure you have docker installed. then run the following command

```bash
npm run start-sonar
# WAIT FOR SONAR TO START
# If its your first time starting sonar make sure to got to http://localhost:2348/
# to set up your sonar project and login.
# Use admin/admin to login the first time
# Set up the project with the following settings
# Project name:  dev
# local repository
# once you set up a token make sure to clone sonar-project.properties.example (remove the .example)
# and replace the sonar.token with the key you just created
npm  run  static-code-analysis
```
