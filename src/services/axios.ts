import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "@env";

export const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
});
