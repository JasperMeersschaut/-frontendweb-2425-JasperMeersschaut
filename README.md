# Exam Assignment Front-end Web Development & Web Services

- Student: Jasper Meersschaut
- Student number: 202396570
- E-mailadres: [jasper.meersschaut@student.hogent.be](mailto:jasper.meersschaut@student.hogent.be)

## Requirements

- [NodeJS v17 or higher](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MySQL v8](https://dev.mysql.com/downloads/windows/installer/8.0.html) (no Oracle account needed, click the tiny link below the grey box)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (no Oracle account needed, click the tiny link below the grey box)
- [cypress](https://www.cypress.io/) (if you want to run the tests)

## Front-end
## Setup
Make sure Corepack is enabled:

```bash
corepack enable
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL = "http://localhost:9000/api"
VITE_CONTENT_URL = "http://localhost:9000"
```

Install all dependencies using the following command:
```bash
cd gymstats-frontend
yarn install
```

## Start the app

### Development
- Make sure a `.env` (see above) is present.
- Start the app using `yarn dev`. It runs on <http://localhost:5137> by default.

### Production
- Make sure a `.env` (see above) is present.
- Build the app using `yarn build`. This will generate a `dist` folder with the compiled files.
- Serve this folder using a static service like Apache, Nginx or others.

### Testing
Run the tests using `yarn test` and choose `E2E testing` in the Cypress window. It will open a new browser window where you can select which test suite to run.

## Back-end

## Setup
### Development
Create a `.env`  file with the following configuration.
Complete the environment variables with your secrets, credentials, etc.

```
NODE_ENV=development
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
RAPIDAPI_KEY=<SECRET_KEY>
```

> Voor het gemak van de beoordelaar geef ik hier de rapidapi key mee. Deze key is echter niet publiek en hoort niet op github te staan.
> De key is: `4b560a6094mshec597a6ddb32e21p1b5152jsn8d7fbe2c87fe`

- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure a `.env` exists (see above)
- Run the migrations: `yarn migrate:dev`
- Start the development server: `yarn start:dev`

### Production

- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure a `.env` exists (see above) or set the environment variables in your production environment also add `AUTH_JWT_SECRET` to the environment variables.
- Run the migrations: `yarn prisma migrate deploy`
- Build the project: `yarn build`
- Start the production server: `node build/src/index.js`

### Testing
Create `.env.test` file with the following configuration.
Complete the environment variables with your secrets, credentials, etc.

```
NODE_ENV=testing
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
```
- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure `.env.test` exists (see above)
- Run the migrations: `yarn migrate:test`
- Run the tests: `yarn test`
- Run the tests with coverage: `yarn test:coverage`
  - This will generate a coverage report in the `__tests__/coverage` folder.
  - Open `__tests__/coverage/lcov-report/index.html` in your browser to see the coverage report.

## Commit naming scheme
- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **perf:** A code change that improves performance
- **test:** Adding missing tests
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation