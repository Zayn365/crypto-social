import { jsonParse } from "@/lib/utils";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const headers: Record<string, string> = {
  platform: "Web",
};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getCookie("token");
    if (token) {
      const { accessToken } = jsonParse(token);
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken.token}`;
    }
    return config;
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      deleteCookie("token");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
