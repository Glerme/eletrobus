import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let refreshFunction: () => Promise<void>;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.status);

      return await refreshFunction();
    } else {
      return Promise.reject(error);
    }
  }
);

export const setSignOutFunction = (func: any) => {
  refreshFunction = func;
};

export default api;
