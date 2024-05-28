// Axios
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_SITE_URL,
  withCredentials: true,
  params: {
    uniqueIdentifier: process.env.ADMIN_USE_UNIQUE_IDENTIFIER,
    adminPrivilegesSecret: process.env.ADMIN_PRIVILEGES_SECRET,
  },
});

export default axiosInstance;
