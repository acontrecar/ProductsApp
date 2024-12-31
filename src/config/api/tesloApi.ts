import axios from "axios";
import getEnvVars from "../../../constants/api";
import { StorageAdapter } from "../adapters/async-storage";

export const { API_URL } = getEnvVars();

const tesloApi = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

//TODO : interceptors

tesloApi.interceptors.request.use(async (config) => {
  const token = await StorageAdapter.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };