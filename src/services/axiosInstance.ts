import axios from "axios";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TOKEN_TIMESTAMP,
} from "constants/localStorage";
import { refresh } from "./auth.service";

export const isTokenValid = () => {
  const creationTime = localStorage.getItem(TOKEN_TIMESTAMP);
  const date = new Date(creationTime ?? "");

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  
  console.log("clientid", import.meta.env.VITE_CLIENT_ID)
  console.log("backendUrl", import.meta.env.VITE_BACKEND_URL)
  console.log("extraHours", import.meta.env.VITE_TOKEN_EXPIRES_HOURS)
  date.setHours(
    date.getHours() + parseInt(import.meta.env.VITE_TOKEN_EXPIRES_HOURS ?? "3")
  );

  return date > new Date();
};

console.log("again backendurl", import.meta.env.VITE_BACKEND_URL)
const apiClient = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

apiClient.interceptors.request.use(async (request) => {
  if (!request.url?.includes("auth") || request.url?.includes("logout")) {
    const isValid = isTokenValid();
    let authToken = "";
    if (isValid) {
      authToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
      console.log("token is valid", authToken)
    } else {
      console.log("token isn't valid - refresh", REFRESH_TOKEN)
      const tokens = await refresh(localStorage.getItem(REFRESH_TOKEN) ?? "");

      localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
      localStorage.setItem(TOKEN_TIMESTAMP, new Date().toString());

      console.log("refresh and set current", tokens.accessToken)
      authToken = tokens.accessToken;
    }

    request.headers.set("authorization", `Bearer ${authToken}`);
  }

  return request;
});

export default apiClient;
