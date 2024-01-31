// axiosClient.js
import axios from "axios";
import { getAcessToken } from "../utils/helper";
const instance = axios.create({
  baseURL: "http://localhost:8080/", // base URL
  timeout: 5000, // thời gian hết hạn call API
  headers: { "Content-Type": "application/json" },
});

const extractCredentialsFromToken = (token) => {
  // Implement your logic to extract username and password from the token
  // For example, if your token is in the format "username:password",
  // you can split it as follows:
  const [username, password] = atob(token).split(":");
  return { username, password };
};

instance.interceptors.request.use(
  function (config) {
    const accessToken = getAcessToken();
    if (accessToken) {
      const credentials = extractCredentialsFromToken(accessToken);
      const basicAuth = btoa(`${credentials.username}:${credentials.password}`);

      config.headers = {
        ...config.headers,
        Authorization: `Basic ${basicAuth}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Interceptor to handle the response from the backend
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
