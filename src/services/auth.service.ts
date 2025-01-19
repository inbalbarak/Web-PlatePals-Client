import { UserAttributes } from "src/interfaces/user.interface";
import apiClient from "./axiosInstance";

type tTokens = {
  _id: string;
  accessToken: string;
  refreshToken: string;
};

const prefix = "auth";

export const googleLogin = async (credential: string) => {
  const res = await apiClient.post<tTokens>(`${prefix}/google-login`, {
    credential,
  });

  return res.data;
};

export const login = async (user: UserAttributes) => {
  const res = await apiClient.post<tTokens>(`${prefix}/login`, user);

  return res.data;
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
