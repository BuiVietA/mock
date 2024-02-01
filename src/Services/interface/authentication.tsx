



import axios from "axios";
export const BASE_URL='http://192.168.100.5:8081/api/v1/auth/';

export const addTokenToAxios = (accessToken: string) => {
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${accessToken}`
        // config.headers.Authorization = `123456789`
        return config;
      }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      })
}