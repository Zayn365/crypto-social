"use client";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import PostHeader from "../home/PostHeader";
import { postsData } from "@/components/dummuyData/postsData";
import ContentCard from "../home/ContentCard";
import PostEmojis from "../home/PostEmojis";
import ReactionStats from "./ReactionStats";
import Comments from "./Comments";

export default function PostDetails() {
  const router = useRouter();
  const { id } = useParams();

  const findPostById = (id: string) => {
    return postsData.find((post) => post.id === id) || null;
  };

  const postsToRender = typeof id === "string" ? findPostById(id) : null;

  return (
    <div>
      <div className="border-b flex items-center py-2">
        <div
          className={`flex items-center gap-2 text-base font-medium text-[#999999] dark:text-[#8C9FB7A0] px-2`}
        >
          <div
            className="rounded-full p-2 whitespace-nowrap dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] border cursor-pointer"
            onClick={() => router.back()}
          >
            <ChevronLeft
              size={16}
              className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
            />
          </div>
          Post by @Moggel
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <PostHeader post={postsToRender} />
        <ContentCard post={postsToRender} />
        <PostEmojis post={postsToRender} />
      </div>
      <ReactionStats />
      <Comments />
    </div>
  );
}
