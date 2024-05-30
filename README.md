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

## **Version History**

- 1.0.0
  - Initial Release(with the dev environment setup, on 29.05.2024)

## **License**

This project is licensed under the GNU License - see the LICENSE.md file for details

## **Acknowledgments**

- Inspired by the activity of Meal Prepping itself, search it up, i believe it's a very nice activity to partake in
