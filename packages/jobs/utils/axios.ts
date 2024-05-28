// Axios
import axios from "axios";
// DOTENV
import * as dotenv from "dotenv";
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_SITE_URL,
  withCredentials: true,
  params: {
    uniqueIdentifier: process.env.ADMIN_USE_UNIQUE_IDENTIFIER,
    adminPrivilegesSecret: process.env.ADMIN_PRIVILEGES_SECRET,
  },
});

export default axiosInstance;
