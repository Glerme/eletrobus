import axios from "axios";
// import { EXPO_PUBLIC_API_URL } from "@env";

const api = axios.create({
  // baseURL: process.env.EXPO_PUBLIC_API_URL,
  baseURL: "https://endlessly-genuine-loon.ngrok-free.app/",
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
  (error) => {
    if (error.response && error.response.status === 401) {
      return refreshFunction().then(() => {
        console.log("REFRESHED");
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export const setSignOutFunction = (func: any) => {
  refreshFunction = func;
};

export default api;
