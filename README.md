# Examenopdracht Front-end Web Development & Web Services

- Student: Jasper Meersschaut
- Studentennummer: 202396570
- E-mailadres: [jasper.meersschaut@student.hogent.be](mailto:jasper.meersschaut@student.hogent.be)

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [cypress](https://www.cypress.io/) (als je de tests wil uitvoeren)

## Front-end
## Opstarten
Install all dependencies using the following command:
```bash
cd gymstats-frontend
yarn install
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL = "http://localhost:9000/api"
VITE_CONTENT_URL = "http://localhost:9000"
```

## Start the app

Start the app using `yarn dev`. It runs on <http://localhost:5137> by default.

## Testen
Run the tests using `yarn test`. It will run the cypress tests. 

## Back-end

## Opstarten

Create a `.env` (development) or `.env.test` (testing) file with the following template.
Complete the environment variables with your secrets, credentials, etc.

```
NODE_ENV=development
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
```

- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure a `.env` exists (see above)
- Run the migrations: `yarn migrate:dev`
- Start the development server: `yarn start:dev`
## Testen
Create a `.env` (development) or `.env.test` (testing) file with the following template.
Complete the environment variables with your secrets, credentials, etc.

```
NODE_ENV=testing
DATABASE_URL=mysql://<USERNAME>:<PASSWORD>@localhost:3306/<DATABASE_NAME>
```
- Enable Corepack: `corepack enable`
- Install all dependencies: `yarn`
- Make sure a `.env.test` exists (see above)
- Start the development server: `yarn test`

## Commit naming scheme:
- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **perf:** A code change that improves performance
- **test:** Adding missing tests
- **chore:** Changes to the build process or auxiliary tools and libraries such as documentation generation