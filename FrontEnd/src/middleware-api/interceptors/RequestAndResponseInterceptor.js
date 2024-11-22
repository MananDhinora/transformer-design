import axios from "axios";
import tokenService from "../token/tokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authHeader = tokenService.getAuthorizationHeader();

    if (authHeader) {
      config.headers["Authorization"] = authHeader;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error); // Debug statement
    return Promise.reject(error);
  }
);

export default axiosInstance;
