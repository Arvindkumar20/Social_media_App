// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // ⬅️ Your backend base URL
  withCredentials: true, // if using cookies
});

export default axiosInstance;
