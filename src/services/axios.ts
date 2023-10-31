import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
