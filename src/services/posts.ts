import { AxiosInstance } from "axios";
import apiClient from "./config/client";
import { deleteHandler, getHandler, postHandler } from "./config/helper";
import { POSTS } from "./config/urls/posts";

export const getAllPosts = async (
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await getHandler(client, POSTS.getAllPosts, {});
};

export const getAllUserPosts = async (
  payload: {
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await getHandler(client, POSTS.getAllUserPosts, payload);
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
  const bodyData = {
    like: payload.like,
    userId: payload.userId,
    emoji: payload.emoji,
  };
  const queryParams = {
    id: payload.id,
  };
  return await postHandler(client, POSTS.likePost, bodyData, queryParams);
};

export const commentPost = async (
  payload: {
    id: number;
    userId: number;
    comment: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const bodyData = {
    userId: payload.userId,
    comment: payload.comment,
  };
  const queryParams = {
    id: payload.id,
  };
  return await postHandler(client, POSTS.commentPost, bodyData, queryParams);
};

export const deletePost = async (
  payload: {
    id: number;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  return await deleteHandler(client, POSTS.deletePost, payload);
};
