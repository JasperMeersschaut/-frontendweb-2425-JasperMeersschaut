# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: Jasper Meersschaut
- Studentennummer: 202396570
- E-mailadres: [jasper.meersschaut@student.hogent.be](mailto:jasper.meersschaut@student.hogent.be)

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Vul eventueel aan

## Front-end

## Opstarten
> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)
Install all dependencies using the following command:
```bash
cd gymstats-frontend
yarn install
```

Create a `.env` with the following content and apply to your configuration:

```dotenv
VITE_API_URL=http://localhost:9000/api
```

## Start the app

Start the app using `yarn dev`. It runs on <http://localhost:5137> by default.

## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)

## Back-end

## Opstarten

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

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

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
