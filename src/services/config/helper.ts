import { AxiosError, AxiosInstance } from "axios";

export const postHandler = async (
  axiosInstance: AxiosInstance,
  url: string,
  payload: unknown
) => {
  try {
    const { data } = await axiosInstance.post(url, payload, {
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
      },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error fetching:", axiosError.message);
    throw axiosError; // Propagate the error to the caller
  }
};

export const patchHandler = async (
  axiosInstance: AxiosInstance,
  url: string,
  payload: unknown,
  params?: Record<string, any>
) => {
  try {
    const { data } = await axiosInstance.patch(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      params,
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error fetching:", axiosError.message);
    throw axiosError;
  }
};

export const getHandler = async (
  axiosInstance: AxiosInstance,
  url: string,
  payload: unknown
) => {
  try {
    const { data } = await axiosInstance.get(url, {
      params: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error fetching:", axiosError.message);
    throw axiosError;
  }
};
