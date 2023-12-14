import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
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
      return refreshFunction().then(() => {});
    } else {
      return Promise.reject(error);
    }
  }
);

export const setSignOutFunction = (func: any) => {
  refreshFunction = func;
};

export default api;
