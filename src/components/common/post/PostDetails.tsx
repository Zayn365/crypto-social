"use client";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import PostHeader from "../home/PostHeader";
import ContentCard from "../home/ContentCard";
import PostEmojis from "../home/PostEmojis";
import ReactionStats from "./ReactionStats";
import Comments from "./Comments";
import { useAuth } from "@/providers/AuthProvider";
import LinkCard from "../home/LinkCard";
import MainLoader from "../MainLoader";

export default function PostDetails() {
  const router = useRouter();
  const { id } = useParams();
  const { allPost } = useAuth();

  if (!allPost || allPost.length === 0) {
    return (
      <div className="p-4 flex gap-2 items-center justify-center min-h-[100vh]">
        <MainLoader />
      </div>
    );
  }

  const findPostById = (id: string) => {
    return allPost.find((post: any) => String(post.id) === String(id)) || null;
  };

  const postsToRender = typeof id === "string" ? findPostById(id) : null;

  if (!postsToRender) {
    return (
      <div className="p-4">
        <div className="border-b flex items-center py-2">
          <div className="flex items-center gap-2 text-base font-medium text-[#999999] dark:text-[#8C9FB7A0] px-2">
            <div
              className="rounded-full p-2 whitespace-nowrap dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] border cursor-pointer"
              onClick={() => router.replace("/")}
            >
              <ChevronLeft
                size={16}
                className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
              />
            </div>
            Post
          </div>
        </div>
        <div className="text-center text-[#999999] dark:text-[#8C9FB7A0] mt-4">
          Post not available
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b flex items-center py-2">
        <div
          className={`flex items-center gap-2 text-base font-medium text-[#999999] dark:text-[#8C9FB7A0] px-2`}
        >
          <div
            className="rounded-full p-2 whitespace-nowrap dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] border cursor-pointer"
            onClick={() => router.replace("/")}
          >
            <ChevronLeft
              size={16}
              className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
            />
          </div>
          Post by @{postsToRender?.userInfo?.username}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <PostHeader post={postsToRender} />
        <ContentCard post={postsToRender} />
        <LinkCard post={postsToRender} />
        <PostEmojis post={postsToRender} />
      </div>
      <ReactionStats post={postsToRender} />
      <Comments post={postsToRender} />
    </div>
  );
}
