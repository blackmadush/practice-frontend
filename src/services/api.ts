import axios from "axios";
import { authDataService } from "../services/data/authDataService";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = authDataService.jwtToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authDataService.jwtToken = ""; // Clear the token
    }
    return Promise.reject(error);
  }
);

export default api;

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const fetchDataItems = async () => {
  const response = await api.get("/data");
  return response.data;
};
