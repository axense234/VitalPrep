# VitalPrep - Meal Prep Helper ( **EN** )

VitalPrep - Meal Prep helper is a fullstack web application that gives users a way to create Meal Prep Plans that they can follow and be notified of.<br>

# Website:

https://vitalprep-meal.com

# Design(created in Figma)

https://www.figma.com/design/HxIgMFqlXjNLuVpPhVsmrT/VitalPrep-Design?node-id=1-3&t=Sa6cZZAqrh9moD6y-0

## Description

VitalPrep - Meal Prep helper is a fullstack web application that gives users a way to create Meal Prep Plans that they can follow and be notified of. The app is based around entities, which are components of a Meal Prep Plan.<br>
The entities are:

1. _Ingredients_
2. _Utensils_
3. _Recipes_
4. _Day Plans_
5. _Session Templates_
6. _Meal Prep Plans_
7. _Session Logs_

With those entities the user can create Meal Prep Plans, activate them and receive notifications based on the Sessions of the given Meal Prep Plan.

## Technologies

### Frontend Technologies:

- **NextJS** (with next-auth for OAuth authentication and next-intl for internalization(language support))
- **Redux** (with Redux Toolkit, for state management)
- **SCSS** (for styles instead of raw css or tailwind)
- **Typecript** (instead of raw js/jsx, makes development way more manageable)

### Backend Technologies:

- **NodeJS**
- **ExpressJS** (it's a web framework for nodejs)
- **Typescript** (like with the frontend, it makes development not as annoying)
- **PostgreSQL** (main database)
- **Prisma** (ORM for postgresql)
- **Redis** (caching database)

### Cloud Services

- **Netlify** (host for frontend)
- **Render** (host for the server, databases and cron jobs)

### Media Management

- **Cloudinary** (to upload images)

## **Getting Started**

### Dependencies

- Check package.json for details.
- NodeJS installed(we recommend the latest stable version)
- PostgreSQL installed (if you are using a local PostgreSQL instance)
- Redis installed (if you are using a local Redis instance)
- Also if you are on Windows, you will need to install Linux since you will need to use Redis, you can install Linux on Windows by installing the Windows Subsystem for Linux(WSL) by following this [**_guide_**](https://learn.microsoft.com/en-us/windows/wsl/install).
- In each individual **package** in the **packages** directory rename the _.env.sample_, _.env.local.sample_ files to _.env_ and _.env.local_ respectively.

### Installing and Execution

**NOTE**: have your databases ready and **.env** files prepared in all **packages** <br>
**NOTE**: follow the installation guides on the packages

### Quick Setup with Docker

**NOTE**: rename the _.env.sample_ file to _.env_ and put the respective environment variables for this quick setup to work

```
docker build -f ./packages/server/Dockerfile -t vitalprep-server ./packages/server
docker build -f ./packages/client/Dockerfile -t vitalprep-client ./packages/client
docker compose up
```

### Packages

- [Frontend](https://github.com/axense234/VitalPrep/tree/master/packages/client)
- [Backend](https://github.com/axense234/VitalPrep/tree/master/packages/server)
- [Jobs](https://github.com/axense234/VitalPrep/tree/master/packages/jobs)

### Executing program

## **Authors**

- **axense234(Comanescu Andrei)**

## **Future Tasks**

- Add a Favorites Page and make it so users can favorite an entity
- Add a Marketplace Page that allows users to post their entities and for others to get a copy of said entities
- Make it so there is a relationship between the MealPrepPlanTiming and instanceTemplate models
- Translate error messages and the PopupModal component
- Add a middleware for controllers that have a lot of query params and are based around an includeObject. Said middleware will remove this bloat from controllers.
- Create a lot more default entities for a newly created user
- Add more error handling for the controllers
- Improve the Login/Signup forms
- Add more diverse query params to the controllers
- Make it so when creating a recipe you can choose how many grams you want of an ingredient
- Make notification messages random
- Add chinese to the website
- Make the redux slices dynamic
- Change the automatically created session log instanceTemplateId
- Add Information Icons to most things

## **Version History**

- 1.1.0
  - Improved the website all around(15.07.2024)
- 1.0.0
  - Initial Release(with the dev environment setup, on 29.05.2024)

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details

## **Acknowledgments**

- Inspired by the activity of Meal Prepping itself, search it up, i believe it's a very nice activity to partake in

<br><br><br><br><br><br><br><br>

# VitalPrep - Meal Prep Helper ( **RO** )

VitalPrep - Meal Prep helper este o aplicație web fullstack care oferă utilizatorilor o modalitate de a crea planuri de pregătire a meselor în avans pe care le pot urma și despre care pot fi notificați.<br>

# Website:

https://vitalprep-meal.com

# Design(creat în Figma)

https://www.figma.com/design/HxIgMFqlXjNLuVpPhVsmrT/VitalPrep-Design?node-id=1-3&t=Sa6cZZAqrh9moD6y-0

## Descriere

VitalPrep - Meal Prep helper este o aplicație web fullstack care oferă utilizatorilor o modalitate de a crea planuri de pregătire a meselor pe care le pot urma și despre care pot fi notificați. Aplicația este bazată pe entități, care sunt componente ale unui plan de pregătire a meselor.<br>
Entitățile sunt:

1. _Ingrediente_
2. _Ustensile_
3. _Ustensile_
4. _Planuri de Zi_
5. _Modele de Sesiune_
6. _Planuri "Meal Prep"_
7. _Jurnale de Sesiune_

Cu ajutorul acestor entități, utilizatorul poate crea planuri de pregătire a meselor, le poate activa și poate primi notificări bazate pe sesiunile planului de pregătire a meselor.

## Tehnologii

### Tehnologii Frontend:

- **NextJS** (cu next-auth pentru autentificare OAuth și next-intl pentru internalizare (suport pentru limbi))
- **Redux** (cu Redux Toolkit, pentru gestionarea stării)
- **SCSS** (for styles instead of raw css or tailwind)
- **Typecript** (în loc de JS/JSX brut, ceea ce face dezvoltarea mult mai gestionabilă)

### Tehnologii Backend:

- **NodeJS**
- **ExpressJS** (este un framework web pentru Node.js)
- **Typescript** (la fel ca și cu partea de frontend, face dezvoltarea mai puțin enervantă)
- **PostgreSQL** (baza de date principală)
- **Prisma** (ORM pentru postgresql)
- **Redis** (baza de date cu memorie cache)

### Servicii Cloud

- **Netlify** (gazdă pentru frontend)
- **Render** (gazdă pentru server, baze de date și job-uri cron)

###

- **Cloudinary** (pentru a încărca imagini)

## **Getting Started**

### Dependențe

- Verificați fișierul `package.json` pentru detalii.
- NodeJS instalat (recomandăm ultima versiune stabilă)
- PostgreSQL instalat (dacă utilizați o instanță locală de PostgreSQL)
- Redis instalat (dacă utilizați o instanță locală de Redis)
- De asemenea, dacă utilizați Windows, va trebui să instalați Linux, deoarece veți avea nevoie de Redis. Puteți instala Linux pe Windows prin instalarea Subsistemului Windows pentru Linux (WSL), urmând acest [**ghid**](https://learn.microsoft.com/en-us/windows/wsl/install).
- În fiecare pachet individual din directorul **packages**, redenumiți fișierele _.env.sample_ și _.env.local.sample_ în _.env_ și _.env.local_, respectiv.

### Instalare și Execuție

**OBSERVAȚIE**: Asigurați-vă că bazele de date sunt pregătite și fișierele .env sunt pregătite în toate pachetele
**OBSERVAȚIE**: Urmați ghidurile de instalare din pachete.

### Configurare rapidă cu Docker

**OBSERVAȚIE**: Redenumiți fișierul .env.sample în .env și introduceți variabilele de mediu corespunzătoare pentru ca această configurare rapidă să funcționeze.

```
docker build -f ./packages/server/Dockerfile -t vitalprep-server ./packages/server
docker build -f ./packages/client/Dockerfile -t vitalprep-client ./packages/client
docker compose up
```

### Pachete

- [Frontend](https://github.com/axense234/VitalPrep/tree/master/packages/client)
- [Backend](https://github.com/axense234/VitalPrep/tree/master/packages/server)
- [Jobs](https://github.com/axense234/VitalPrep/tree/master/packages/jobs)

## **Autori**

- **axense234(Comanescu Andrei)**

## **Activități viitoare**

- Adăugă o pagină de Favorite și permiteți utilizatorilor să favoriteze o entitate
- Adăugă o pagină de Marketplace care permite utilizatorilor să posteze entitățile lor și pentru alții să obțină o copie a acestor entități
- Asigurați-vă că există o relație între modelele MealPrepPlanTiming și instanceTemplate
- Traduceți mesajele de eroare și componenta PopupModal
- Adăugă un middleware pentru controlorii care au multe parametri de interogare și sunt bazate pe un includeObject. Acest middleware va elimina acest exces din controlori.
- Creați mai multe entități implicite pentru un utilizator nou creat
- Adăugă mai multe manipulări de erori pentru controlori
- Îmbunătățiți formularele de Login/Signup
- Adăugă mai mulți parametri de interogare diversificați la controlori
- Faceți astfel încât la crearea unei rețete să puteți alege câte grame doriți pentru un ingredient
- Faceți mesajele de notificare aleatorii
- Adăugă limba chineză pe site
- Faceți "feliile" redux să fie dinamice
- Modificați ID-ul șablonului de instanță a jurnalului de sesiune creat automat
- Adăugă pictograme informative pentru majoritatea elementelor

## **Istoricul Versiunilor**

- 1.1.0
  - Îmbunătățiri generale ale site-ului (15.07.2024)
- 1.0.0
  - Lansare inițială (cu configurarea mediului de dezvoltare, la 29.05.2024)

## **Licență**

Acest proiect este licențiat sub Licența GNU - consultați fișierul LICENSE.md pentru detalii

## **Recunoștințe**

- Inspirat de activitatea de pregătire a meselor în avans, căutați mai multe informații despre aceasta, cred că este o activitate foarte benefică oricui
