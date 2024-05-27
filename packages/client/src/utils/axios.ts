// Axios
import axios from "axios";
// Base Server URL
import { baseServerUrl } from "@/config";

const axiosInstance = axios.create({
  baseURL: baseServerUrl,
  withCredentials: true,
  params: {
    uniqueIdentifier: process.env.NEXT_PUBLIC_ADMIN_USE_UNIQUE_IDENTIFIER,
  },
});

export default axiosInstance;
