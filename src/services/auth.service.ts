import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";
import { REFRESH_TOKEN } from "constants/localStorage";

type tTokens = {
  accessToken: string;
  refreshToken: string;
};

const prefix = "auth";

export const googleLogin = async (credential: string) => {
  try {
    const res = await apiClient.post<tTokens>(`${prefix}/google-login`, {
      credential,
    });

    return res.data;
  } catch (_err) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    return await refresh(refreshToken ?? "");
  }
};

export const login = async (user: UserAttributes) => {
  try {
    const res = await apiClient.post<tTokens>(`${prefix}/login`, user);

    return res.data;
  } catch (_err) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    return await refresh(refreshToken ?? "");
  }
};

export const register = async (user: UserAttributes) => {
  const res = (await apiClient.post<UserAttributes>(`${prefix}/register`, user))
    .data;

  return login({
    email: res.email,
    password: res.password,
    username: res.username,
  });
};

export const refresh = async (refreshToken: string) => {
  const res = await apiClient.post<tTokens>(`${prefix}/refresh`, {
    refreshToken,
  });

  return res.data;
};
