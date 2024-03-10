const env = process.env.NODE_ENV;

const baseServerUrl =
  env === "development" || env === "test"
    ? "http://localhost:4000"
    : "http://localhost:4000";

const baseSiteUrl =
  env === "development" ? "http://localhost:3000" : "http://localhost:3000";

export { baseServerUrl, baseSiteUrl };
