# Dossier

<!-- > Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak uit dit document.
> Lees <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet> om te weten hoe een Markdown-bestand opgemaakt moet worden.
> Verwijder alle instructies (lijnen die starten met >). -->

- Student: Jasper Meersschaut
- Studentennummer: 202396570
- E-mailadres: [jasper.meersschaut@student.hogent.be](mailto:jasper.meersschaut@student.hogent.be)
- Demo:
<!--  TODO: panopto link toevoegen -->
- GitHub-repository: [GitHub Repository](https://github.com/HOGENT-frontendweb/frontendweb-2425-JasperMeersschaut)
- Front-end Web Development
  - Online versie: https://frontendweb-jaspermeersschaut.onrender.com
- Web Services:
  - Online versie: https://webservices-jaspermeersschaut.onrender.com

## Logingegevens

### Lokaal
#### Admin:
- Gebruikersnaam/e-mailadres: meersschaut.jasper@gmail.com
- Wachtwoord: 12345678

#### User:
- Gebruikersnaam/e-mailadres: marie.dubois@example.com
- Wachtwoord: 12345678

### Online
#### Admin:
- Gebruikersnaam/e-mailadres: meersschaut.jasper@gmail.com
- Wachtwoord: 12345678

#### User:
- Gebruikersnaam/e-mailadres: marie.dubois@example.com
- Wachtwoord: 12345678

## Projectbeschrijving
> Mijn project heet gymstats. Je kan op mijn website oefeningen bekijken met daarbij de uitleg en een video van de oefening. Je kan ook een profiel aanmaken en je eigen workouts maken met bestaande oefeningen. Er zijn ook standaard workouts voor beginners die niet echt weten hoe een workout in elkaar zit. Je kan ook je BMI berekenen op de profiel pagina.
### Gebruikers
- Een user 
  - kan zich registreren
  - kan inloggen
  - kan oefeningen bekijken
  - kan workouts bekijken
  - kan zijn eigen workouts maken
  - kan zijn BMI berekenen
- Een admin
  - kan oefeningen toevoegen
  - kan standaar workouts toevoegen die iedereen kan zien
  - kan oefeningen en workouts aanpassen
  - kan oefeningen en workouts verwijderen
  - kan gebruikers bekijken, rollen aanpassen en verwijderen

### Oefeningen
- Een oefening heeft een naam, uitleg, afbeelding en video.
- Een oefening kan toegevoegd, aangepast en verwijderd worden door een admin.

### Workouts
- Een workout heeft een naam, beschrijving, lengte, spier focus en een lijst van oefeningen.
- Een standaard workout kan toegevoegd, aangepast en verwijderd worden door een admin.
- Een user kan zijn eigen workout maken met bestaande oefeningen.

### Databank

![ERD](./assets/ERD.png)

[Link naar ERD](https://kroki.io/erd/svg/eNplj8EKgzAMhu95Cs8OD77CmBu77DY8yJCuDbZMrSQp6tuvToWBlz_hT778pHoy0gtSZ6BXHUKrWB5Lg51yLTBO8HYk1iiJQ-wbsTCia6zAoJhHT6a2ii2Qb5EBqmJC0o5xvSnzgNAF1i3eyIcBDLImN4jzfVwuPX18kL9dE0j9hit09TowaMIYb85zRGrcAsSPO31Ki_slahkVloeSPMvSZLsOW13NIw9HK0mzLE_2V7791WbD)


## Screenshots

### Home
<img src="./assets/PC/HomePage.png" alt="Home" width="1000" />
<img src="./assets/GSM/HomePage.png" alt="Home" width="300" />

### Exercises
<img src="./assets/PC/ExercisePage.png" alt="Exercises" width="1000" />
<img src="./assets/GSM/ExercisePage.png" alt="Exercises" width="300" />

### Workouts
<img src="./assets/PC/WorkoutPage.png" alt="Workouts" width="1000" />
<img src="./assets/PC/WorkoutCreationPage.png" alt="Workouts" width="1000" />
<img src="./assets/GSM/WorkoutPage.png" alt="Workouts" width="300" />


### Profile
<img src="./assets/PC/ProfilePage.png" alt="Profile" width="1000" />
<img src="./assets/GSM/HomePage.png" alt="Home" width="300" />

### Navbar
<img src="./assets/GSM/Navbar.png" alt="Navbar" width="300" />



## API calls

> Maak hier een oplijsting van alle API cals in jouw applicatie. Groepeer dit per entiteit. Hieronder een voorbeeld.
> Dit is weinig zinvol indien je enkel Front-end Web Development volgt, verwijder dan deze sectie.
> Indien je als extra Swagger koos, dan voeg je hier een link toe naar jouw online documentatie. Swagger geeft nl. exact (en nog veel meer) wat je hieronder moet schrijven.

### Gebruikers

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

#### Componenten

- [ ] heeft meerdere componenten - dom & slim (naast login/register)
- [x] applicatie is voldoende complex
- [ ] definieert constanten (variabelen, functies en componenten) buiten de component
- [ ] minstens één form met meerdere velden met validatie (naast login/register)
- [ ] login systeem

#### Routing

- [x] heeft minstens 2 pagina's (naast login/register)
- [x] routes worden afgeschermd met authenticatie en autorisatie

#### State management

- [x] meerdere API calls (naast login/register)
- [x] degelijke foutmeldingen indien API-call faalt
- [ ] gebruikt useState enkel voor lokale state
- [ ] gebruikt gepast state management voor globale state - indien van toepassing

#### Hooks

- [ ] gebruikt de hooks op de juiste manier

#### Algemeen

- [ ] een aantal niet-triviale én werkende e2e testen
- [x] minstens één extra technologie
- [ ] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [ ] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de applicatie draait online
- [ ] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

### Web Services

#### Datalaag

- [x] voldoende complex en correct (meer dan één tabel (naast de user tabel), tabellen bevatten meerdere kolommen, 2 een-op-veel of veel-op-veel relaties)
- [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
- [x] heeft migraties - indien van toepassing
- [x] heeft seeds

#### Repositorylaag

- [x] definieert één repository per entiteit - indien van toepassing
- [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
- [ ] er worden kindrelaties opgevraagd (m.b.v. JOINs) - indien van toepassing

#### Servicelaag met een zekere complexiteit

- [x] bevat alle domeinlogica
- [x] er wordt gerelateerde data uit meerdere tabellen opgevraagd
- [x] bevat geen services voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] bevat geen SQL-queries of databank-gerelateerde code

#### REST-laag

- [x] meerdere routes met invoervalidatie
- [x] meerdere entiteiten met alle CRUD-operaties
- [x] degelijke foutboodschappen
- [x] volgt de conventies van een RESTful API
- [x] bevat geen domeinlogica
- [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bv. tussentabellen)
- [x] degelijke autorisatie/authenticatie op alle routes

#### Algemeen

- [x] er is een minimum aan logging en configuratie voorzien
- [x] een aantal niet-triviale én werkende integratietesten (min. 1 entiteit in REST-laag >= 90% coverage, naast de user testen)
- [x] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] minstens één extra technologie die we niet gezien hebben in de les
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [x] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de API draait online
- [x] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

#### mappenStructuur
gymstats-frontend

### Web Services
gymstats-webservice/
- **\_\_tests__/**
  - **coverage/** -> Bevat de coverage van de testen
  - **helpers/** -> Bevat helperfuncties voor de testen
  - rest/ -> **Bevat alle testen van de REST-laag**
- config/ -> **Bevat de configuratie van de applicatie**
- public/
  - images/ -> **Bevat de afbeeldingen die gebruikt worden in de applicatie**
    - exercises/ -> **Bevat de afbeeldingen van de oefeningen**
    - users/ -> **Bevat de afbeeldingen van de gebruikers**
  - videos/ -> **Bevat de video's die gebruikt worden in de applicatie**
    - exercises/ -> **Bevat de video's van de oefeningen**
  
> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

## Extra technologie

### Front-end Web Development

#### Tailwind CSS
 Ik heb tailwind gebruikt omdat het me interesant leek. Ik heb al mooie resultaten gezien met tailwind en dit project leek mij een goede reden om het zelf eens te proberen.

 Tailwind is een utility-first CSS framework waarmee je snel en efficiënt stijlen kunt toepassen op je HTML-elementen zonder dat je zelf CSS hoeft te schrijven. 

 **Werking**:
  - Je voegt de tailwind classes toe aan je HTML-elementen.
  - Tailwind genereert een CSS-bestand met alle stijlen die je hebt toegevoegd.
  - Je kan de stijlen van je elementen aanpassen door de tailwind classes aan te passen.

[Tailwind](https://www.npmjs.com/package/tailwindcss)
### Web Services
#### Externe API (RapidAPI)
Ik heb een externe API gebruikt in mijn project. Deze wordt aangesproken door de backend, de key zit in de .env file. De API die ik gebruik is de "Smart Body Mass Index Calculator (BMI) API". Deze API berekent de BMI van een persoon op basis van zijn lengte en gewicht.

**Werking**:
- Op de profiel pagina wordt er een call gedaan naar de `api/index.ts` file. De lengte en het gewicht van de gebruiker worden meegegeven aan de API.
- De index.js file roept de backend API aan en geeft de lengte en het gewicht van de gebruiker mee.
- De backend API doet een call naar de externe API en geeft de lengte en het gewicht van de gebruiker mee.
- De externe API berekent de BMI van de gebruiker en geeft deze terug aan de backend API.
- De backend API geeft de BMI van de gebruiker terug aan de index.js file.
- De index.js file geeft de BMI van de gebruiker terug aan de profiel pagina.

[Smart Body Mass Index Calculator](https://rapidapi.com/andreabaragiola/api/smart-body-mass-index-calculator-bmi)
## Gekende bugs

### Front-end Web Development

> Zijn er gekende bugs?

### Web Services

> Zijn er gekende bugs?

## Reflectie

> Wat vond je van dit project? Wat heb je geleerd? Wat zou je anders doen? Wat vond je goed? Wat vond je minder goed?
> Wat zou je aanpassen aan de cursus? Wat zou je behouden? Wat zou je toevoegen?
