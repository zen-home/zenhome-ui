# Installation
###  Install the dependencies
```bash
npm i
```

### Install quasar with
```bash
npm i -g @quasar/cli
```

# Commands
###  Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```

###  SonarQube

make sure you have docker installed. then run the following command

```bash
npm run start-sonar
```
* WAIT FOR SONAR TO START
* If its your first time starting sonar make sure to got to http://localhost:2348/ to set up your sonar project and login.
* Use admin/admin to login the first time
* Set a password for your local admin account
* Set up the project with the following settings
  * Project name:  dev
  * Local repository
* Set up a token
* make sure to clone sonar-project.properties.example (remove the .example)
* replace the sonar.token with the token you just created in the sonar web app
```bash
npm  run  static-code-analysis
```
