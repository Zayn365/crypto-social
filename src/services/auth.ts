import { AxiosInstance } from "axios";
import apiClient from "./config/client";
import { postHandler } from "./config/helper";
import { AUTH } from "./config/urls/auth";

export const register = async (
  payload: {
    email: string;
    password: string;
    roleId: number;
    walletAddress: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, AUTH.register, payload);
};

export const loginWithWallet = async (
  payload: {
    password: string;
    walletAddress: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, AUTH.loginWithWallet, payload);
};

export const login = async (
  payload: {
    password: string;
    email: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, AUTH.login, payload);
};

export const registerWithEmail = async (
  payload: {
    password: string;
    roleId: number;
    walletAddress: string;
    email: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, AUTH.registerWithEmail, payload);
};

export const forgotPassword = async (
  payload: {
    email: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, AUTH.forgotPassword, payload);
};

export const resetPassword = async (
  payload: {
    password: string;
    token: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const params = {
    token: payload.token,
  };
  const bodyData = {
    password: payload.password,
  };
  return await postHandler(client, AUTH.resetPassword, bodyData, params);
};
