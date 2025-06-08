import { AxiosInstance } from "axios";
import apiClient from "./config/client";
import { getHandler, patchHandler, postHandler } from "./config/helper";
import { USER } from "./config/urls/user";

export const uploadAvatar = async (
  payload: {
    avatar: File;
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const formData = new FormData();
  formData.append("avatar", payload.avatar);

  const queryParams = {
    id: payload.id,
  };
  return await postHandler(client, USER.uploadAvatar, formData, queryParams);
};

export const uploadCover = async (
  payload: {
    cover: File;
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const formData = new FormData();
  formData.append("cover", payload.cover);

  const queryParams = {
    id: payload.id,
  };
  return await postHandler(client, USER.uploadCover, formData, queryParams);
};

export const updateUserInfo = async (
  payload: {
    userId?: number;
    name?: string;
    email?: string;
    wallet_address?: string;
    password?: string;
    username?: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  if (!payload.userId) {
    throw new Error("User ID is required to update user info.");
  }
  const queryParams = {
    userId: payload.userId,
  };

  const bodyData = {
    ...(payload.name && { name: payload.name }),
    ...(payload.email && { email: payload.email }),
    ...(payload.wallet_address && { wallet_address: payload.wallet_address }),
    ...(payload.password && { password: payload.password }),
    ...(payload.username && { username: payload.username }),
  };

  const hasBodyData = Object.keys(bodyData).length > 0;

  return await patchHandler(
    client,
    USER.updateUserInfo,
    hasBodyData ? bodyData : undefined,
    queryParams
  );
};

export const getAllUsers = async (
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await getHandler(client, USER.getAllUsers, {});
};

export const getUserById = async (
  payload: {
    userId?: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await getHandler(client, USER.getUserById, payload);
};
