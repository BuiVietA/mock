// authService.js
import { toast } from "react-toastify";
import instance from "./axiosClient";
const authService = {
  async login() {
    try {
      const response = await instance.post("auth/login");
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      return response;
    } catch (error) {
      // Handle specific error cases if needed
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(`Response error: ${error.response?.data}`);
        toast.error(`Response status: ${error.response?.status}`);

        // console.error('Response error:', error.response.data);
        console.log('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }

      // Propagate the error for further handling or display
      throw error;
    }
  },
  // Other methods...
};

export default authService;
