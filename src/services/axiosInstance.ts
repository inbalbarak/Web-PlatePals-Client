import axios from "axios";
import { ACCESS_TOKEN } from "constants/localStorage";

const apiClient = axios.create({ baseURL: import.meta.env.BACKEND_URL });

apiClient.interceptors.request.use(async (request) => {
  const authToken = localStorage.getItem(ACCESS_TOKEN);

  request.headers.set("authorization", `Bearer ${authToken}`);

  return request;
});

export default apiClient;
