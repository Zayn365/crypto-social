import { AxiosInstance } from "axios";
import apiClient, { ApiResponse } from "./config/client";
import { postHandler } from "./config/helper";
import { USER } from "./config/urls/user";

export const uploadAvatar = async (
  payload: FormData,
  client: AxiosInstance = apiClient
): Promise<ApiResponse<any>> => {
  return await postHandler(client, USER.uploadAvatar, payload);
};

export const updateUserInfo = async (
  payload: {
    name: string;
    email: string;
    wallet_address: string;
    password: string;
    username: string;
  },
  client: AxiosInstance = apiClient
): Promise<ApiResponse<any>> => {
  return await postHandler(client, USER.updateUserInfo, payload);
};

export const getAllUsers = async (
  client: AxiosInstance = apiClient
): Promise<ApiResponse<any>> => {
  return await postHandler(client, USER.getAllUsers, {});
};
