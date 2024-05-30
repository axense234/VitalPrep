# VitalPrep - Cron Jobs

The cron job scrits for the [VitalPrep - Meal Prep Helper](https://github.com/axense234/VitalPrep) project.

# Website:

https://vitalprep-helper.com

## Dependencies

- Git installed on your machine
- Check package.json for other dependencies
- rename **.env.sample** to **.env** and put your own environment variables respectively:

### NOTIFICATIONS(using ONESIGNAL)

- **ONE_SIGNAL_APP_ID** = your one signal app id
- **ONE_SIGNAL_REST_API_KEY** = your one signal rest api key

### SERVER

- **SERVER_SITE_URL** = your server site url

### SECURITY

- **ADMIN_PRIVILEGES_SECRET** = your privileges secret to allow the bypass of the authentication middleware on the server(if the server site url is the same as the backend)
- **ADMIN_USE_UNIQUE_IDENTIFIER** = your unique identifier that tells the backend that requests from this package is allowed

### Installation and Execution

- Install Dependencies

```
npm install
```

- Run the Day Script

```
npm run day
```

- Run the Hour Script

```
npm run hour
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
