# VitalPrep - Backend

The backend for the [VitalPrep - Meal Prep Helper](https://github.com/axense234/VitalPrep) project.

# Website:

https://vitalprep-helper.com

## Dependencies

- Git installed on your machine
- Docker installed on your machine(optional)
- Your own Postgres DB(optional if you test using docker-compose)
- Your own Redis DB(optional if you test using docker-compose)
- Check package.json for other dependencies
- rename **.env.sample** to **.env** and put your own environment variables respectively:

### General

- **PORT** = the port your server will run on, the default should be 4000

### JWT

- **JWT_SECRET_KEY** = your json web token secret key
- **JWT_EXP_TIME** = the time it takes for a json web token to expire, default is 32 \* 3600(it means 32 hours)

### SECURITY and EXPIRATIONS

- **MAX_RATE_LIMIT** = the max limit of requests each ip can have send in 15 minutes
- **CORS_TESTING_CLIENT_ORIGIN** = the url of the client origin while testing
- **CORS_PRODUCTION_CLIENT_ORIGIN** = the url of the client origin in production
- **ADMIN_USE_UNIQUE_IDENTIFIER** = the unique identifier that is sent as a query param on all requests using axios that tells the server it can receive requests from this origin
- **ADMIN_PRIVILEGES_SECRET** = the secret key that allows bypass of the authentication middleware

### REDIS

- **REDIS_CACHE_EXP_TIME** = the time it takes for any redis key to become expired(default is 32 \* 3600 which means 32 hours)
- **REDIS_HOST** = the host of your redis instance
- **REDIS_PASSWORD** = the password of your redis instance
- **REDIS_PORT** = the port of your redis instance
- **REDIS_COMMANDER_PORT** = the port of your redis commander instance(using docker compose)

### POSTGRESQL

- **PGHOST** = the host of your postgresql instance
- **PGDATABASE** = the name of your postgresql db instance
- **PGUSERNAME** = the username of your postgresql user
- **PGPASSWORD** = the password of your postgresql user
- **PGPORT** = the port of your postgresql instance
- **ADMINER_PORT** = the port of your postgresql adminer instance(using docker compose)

### DB URLS

- **DATABASE_URL** = the url of your postgresql db instance, can be left on the default value since it is composed of other respective env variables or can be changed for a quick setup
- **REDIS_INSTANCE_URL** = the same as **DATABASE_URl** but for redis
