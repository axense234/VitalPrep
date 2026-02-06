# VitalPrep - Frontend

The frontend for the [VitalPrep - Meal Prep Helper](https://github.com/axense234/VitalPrep) project.

# Website:

https://vitalprep-meal.com

## Dependencies

- Check package.json for details.
- NodeJS installed(we recommend the latest stable version)
- Rename _.env.local.sample_ to _.env.local_ and put appropiate **env variables**:
  - **GITHUB_CLIENT_ID** = your github oauth client id
  - **GITHUB_CLIENT_SECRET** = your github oauth client secret
  - **GOOGLE_CLIENT_ID** = your google oauth client id
  - **GOOGLE_CLIENT_SECRET** = your google client secret
  - **NEXTAUTH_SECRET** = your next-auth secret
  - **NEXTAUTH_URL** = your next-auth base url
  - **NEXT_PUBLIC_ADMIN_USE_UNIQUE_IDENTIFIER** = the unique identifier that signals to the server that requests are allowed from this specific frontend
  - **NEXT_PUBLIC_ONE_SIGNAL_APP_ID** = your one signal app id
  - **NEXT_PUBLIC_REST_API_KEY** = your one signal rest api key
  - **NEXT_PUBLIC_RECAPTCHA_SITE_KEY** = your recaptcha site key
  - **NEXT_PUBLIC_TESTING_CLIENT_SITE_URL** = your testing client site url
  - **NEXT_PUBLIC_PRODUCTION_CLIENT_SITE_URL** = your production client site url
  - **NEXT_PUBLIC_TESTING_SERVER_SITE_URL** = your testing server site url
  - **NEXT_PUBLIC_PRODUCTION_SERVER_SITE_URL** = your production server site url
  - **NEXT\_\*PUBLIC_CLOUDINARY_UPLOAD_IMAGE_URL** = your cloudinary upload image url

### Installation and Execution

- Normal setup

```
npm install
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
