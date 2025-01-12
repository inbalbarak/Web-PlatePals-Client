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
  date.setHours(
    date.getHours() + parseInt(import.meta.env.TOKEN_EXPIRES_HOURS ?? "")
  );

  return date > new Date();
};

const apiClient = axios.create({ baseURL: import.meta.env.BACKEND_URL });

apiClient.interceptors.request.use(async (request) => {
  if (!request.url?.includes("refresh")) {
    const isValid = isTokenValid();
    let authToken = "";
    if (isValid) {
      authToken = localStorage.getItem(ACCESS_TOKEN) ?? "";
    } else {
      const tokens = await refresh(localStorage.getItem(REFRESH_TOKEN) ?? "");

      localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
      localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
      localStorage.setItem(TOKEN_TIMESTAMP, new Date().toString());

      authToken = tokens.accessToken;
    }

    request.headers.set("authorization", `Bearer ${authToken}`);
  }

  return request;
});

export default apiClient;
