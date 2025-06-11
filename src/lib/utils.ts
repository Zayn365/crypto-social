import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentPost, deletePost, likePost } from "@/services/posts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonParse(data: string, defaultValue: unknown = null) {
  try {
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.warn(error);
    return defaultValue;
  }
}

export function sliceMethod(value: string) {
  try {
    const val = `${value?.slice(0, 4)}...${value?.slice(
      value.length - 4,
      value.length
    )}`;
    return val;
  } catch (error) {
    console.log(error);
  }
}

export function formatDateWithAgo(dateString: string): string {
  const formatted = moment(dateString).format("MMM-DD-YYYY");
  const days = moment().diff(moment(dateString), "days");
  return `${formatted} (${days} day${days !== 1 ? "s" : ""} ago)`;
}

export const formatPrice = (price: number | null) => {
  if (price === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 8 : 2,
  }).format(price);
};

export const getTotalLikes = (postInfo: any[]) =>
  postInfo?.reduce((sum, item) => sum + (item?.like === true ? 1 : 0), 0);

export const getTotalMainComments = (postInfo: any[]) =>
  postInfo?.reduce((total, item) => {
    const commentCount = item?.comments?.length || 0;
    return total + commentCount;
  }, 0) || 0;

export const getTotalReplies = (postInfo: any[]) =>
  postInfo?.reduce((total, item) => {
    const replyCount =
      item?.comments?.reduce(
        (sum: number, comment: any) => sum + (comment?.reply?.length || 0),
        0
      ) || 0;
    return total + replyCount;
  }, 0) || 0;

export const emojis = ["😊", "😂", "❤️", "👍", "😍", "😢", "😡", "🎉"];

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Liked successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostUnLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success("Like removed");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Comment posted`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const usePostDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUserPosts"] });
      toast.success(`Post Deleted`);
      router.replace("/");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};

export const defaultUserProfile = "/userDefault.webp";
export const defaultUserCover = "/empty-39.webp";

export const validateImageAspectRatio = (
  file: File,
  expectedRatio: number,
  tolerance: number = 0.1
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const actualRatio = img.width / img.height;
      URL.revokeObjectURL(objectUrl);

      const isValid = Math.abs(actualRatio - expectedRatio) <= tolerance;

      resolve(isValid);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for aspect ratio check."));
    };

    img.src = objectUrl;
  });
};
