# VitalPrep - Meal Prep Helper

VitalPrep - Meal Prep helper is a fullstack web application that gives users a way to create Meal Prep Plans that they can follow and be notified of.<br>

# Website:

https://vitalprep-helper.com

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
- **Typecript** (instead of raw js/jsx, makes development wayyy more manageable)

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
- Redis installed (if you are using a local Redis instance)
- Also if you are on Windows, you will need to install Linux since you will need to use Redis, you can install Linux on Windows by installing the Windows Subsystem for Linux(WSL) by following this [**_guide_**](https://learn.microsoft.com/en-us/windows/wsl/install).
- In each individual **package** in the **packages** directory rename the _.env.sample_, _.env.local.sample_ files to _.env_ and _.env.local_ respectively.

### Installing

```
git clone https://github.com/axense234/VitalPrep
cd VitalPrep
npm install
npm run migration;npm run generation
```

### Executing program

- follow these steps **after completing the variables in .env**!!!
- if you are using an **internal Redis instance**:

```
redis-server -> in a WSL terminal if on Windows !!!
npm run dev
```

- if you are using an **external Redis instance**:

```
npm run dev
```

## **Authors**

- **axense234(Comanescu Andrei)**

## **Version History**

- 1.0.0
  - Initial Release(with the dev environment setup, on 29.05.2024)

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details

## **Acknowledgments**

- Inspired by the activity of Meal Prepping itself, search it up, i believe it's a very nice activity to partake in
