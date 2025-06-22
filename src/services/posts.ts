import { AxiosInstance } from "axios";
import apiClient from "./config/client";
import {
  deleteHandler,
  getHandler,
  patchHandler,
  postHandler,
} from "./config/helper";
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
  payload: {
    id: number;
    formData: FormData;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const queryParams = {
    id: payload.id,
  };
  return await patchHandler(
    client,
    POSTS.updatePost,
    payload?.formData,
    queryParams
  );
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
  const params = {
    id: payload.id,
  };
  return await deleteHandler(client, POSTS.deletePost, {}, params);
};

export const commentDelete = async (
  payload: {
    id: number;
    userId: number;
    commentId: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const params = {
    id: payload.id,
  };
  const bodyData = {
    userId: payload.userId,
    commentId: payload.commentId,
  };
  return await deleteHandler(client, POSTS.commentDelete, bodyData, params);
};

export const commentReply = async (
  payload: {
    id: number;
    userId: number;
    comment: string;
    commentId: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const bodyData = {
    userId: payload.userId,
    comment: payload.comment,
    commentId: payload.commentId,
  };
  const queryParams = {
    id: payload.id,
  };
  return await postHandler(client, POSTS.commentReply, bodyData, queryParams);
};

export const commentReplyDelete = async (
  payload: {
    id: number;
    replyId: string;
    userId: number;
    commentId: string;
  },
  client: AxiosInstance = apiClient
): Promise<Response> => {
  const params = {
    id: payload.id,
  };
  const bodyData = {
    userId: payload.userId,
    replyId: payload.replyId,
    commentId: payload.commentId,
  };
  return await deleteHandler(
    client,
    POSTS.commentReplyDelete,
    bodyData,
    params
  );
};

export const commentUpdate = async (
  payload: {
    id: number;
    userId: number;
    comment: string;
    commentId: string;
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
  return await patchHandler(client, POSTS.commentUpdate, bodyData, queryParams);
};
