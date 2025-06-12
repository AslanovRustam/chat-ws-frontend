import axios from "axios";
import { BASE_URL } from "@/constants/constants";

export const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
});

let accessToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
  accessToken = token;
};

instance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
