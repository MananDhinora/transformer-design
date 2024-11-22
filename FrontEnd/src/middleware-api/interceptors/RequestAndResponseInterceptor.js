import axios from "axios";
import tokenService from "../token/tokenService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authHeader = tokenService.getAuthorizationHeader();
    console.log("Adding Authorization Header:", authHeader); // Debug statement
    if (authHeader) {
      config.headers["Authorization"] = authHeader;
    }
    console.log("Request Config:", config); // Debug statement
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error); // Debug statement
    return Promise.reject(error);
  }
);

export default axiosInstance;
