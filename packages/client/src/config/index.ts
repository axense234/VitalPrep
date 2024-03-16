const env = process.env.NODE_ENV;

const baseServerUrl =
  env === "development" || env === "test"
    ? process.env.NEXT_PUBLIC_TESTING_SERVER_SITE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_SERVER_SITE_URL;

const baseSiteUrl =
  env === "development"
    ? process.env.NEXT_PUBLIC_TESTING_CLIENT_SITE_URL
    : process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_SITE_URL;

export { baseServerUrl, baseSiteUrl };
