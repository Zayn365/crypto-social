import { AxiosInstance } from "axios";
import apiClient from "./config/client";
import { postHandler } from "./config/helper";
import { POSTS } from "./config/urls/posts";

export const getAllPosts = async (
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.getAllPosts, {});
};

export const getAllUserPosts = async (
  payload: {
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.getAllUserPosts, payload);
};

export const createPost = async (
  payload: FormData,
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.createPost, payload);
};

export const updatePost = async (
  payload: FormData,
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.updatePost, payload);
};

export const likePost = async (
  payload: {
    id: number;
    like: boolean;
    userId: number;
    emoji: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.likePost, payload);
};

export const commentPost = async (
  payload: {
    id: number;
    userId: number;
    comment: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.commentPost, payload);
};

export const deletePost = async (
  payload: {
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await postHandler(client, POSTS.deletePost, payload);
};
