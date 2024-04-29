// Axios
import axios from "axios";
// Base Server URL
import { baseServerUrl } from "@/config";

const axiosInstance = axios.create({
  baseURL: baseServerUrl,
  withCredentials: false,
});

export default axiosInstance;
