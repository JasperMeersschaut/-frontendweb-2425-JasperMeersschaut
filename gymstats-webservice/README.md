# gymstats-webservice
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
