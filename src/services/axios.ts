import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let signOutFunction: () => Promise<void>;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response.status);

      await signOutFunction();
    }
    return;
  }
);

export const setSignOutFunction = (func: any) => {
  signOutFunction = func;
};

export default api;
