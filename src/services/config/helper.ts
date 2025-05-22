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
    console.error("Error fetching user profile:", axiosError.message);
    throw axiosError; // Propagate the error to the caller
  }
};
