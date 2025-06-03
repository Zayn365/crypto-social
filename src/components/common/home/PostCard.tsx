"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChartNoAxesColumn,
  Gem,
  MessageSquareMore,
  Repeat2,
  Smile,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";
import LinkCard from "./LinkCard";
import ContentCard from "./ContentCard";
import PostHeader from "./PostHeader";
import { useRouter } from "next/navigation";
import PostEmojis from "./PostEmojis";
import { useAuth } from "@/providers/AuthProvider";
import { getTotalComments, getTotalLikes } from "@/lib/utils";

export default function PostCard() {
  const router = useRouter();
  const { allPost } = useAuth();
  return (
    <div>
      {allPost?.map((post: any, index: any) => (
        <div
          key={index}
          onClick={() => router.replace(`/post/${post?.id}`)}
          className="flex items-stretch gap-4 cursor-pointer p-6 hover:bg-[#F9F9F9] dark:hover:bg-[#080A0E] max-md:flex-col"
        >
          <div className="flex flex-col gap-2 max-md:flex-row max-md:justify-between">
            <Avatar className="size-14">
              <AvatarImage
                width={100}
                height={100}
                className="w-14 h-14 object-cover"
                src={post?.userInfo?.avatar ?? "/userDefault.webp"}
              />
              <AvatarFallback>
                {post?.userInfo?.avatarFallback ?? "img"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-center gap-1">
              <ThumbsUp className="text-[#8c9fb7a0] cursor-pointer" size={16} />
              <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-sm">
                {post?.userInfo?.postValue ?? 0}
              </div>
              <ThumbsDown
                className="text-[#8c9fb7a0] cursor-pointer"
                size={16}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <PostHeader post={post} />
            <div className="flex flex-col gap-2">
              <ContentCard post={post} />
              <LinkCard post={post} />
              <PostEmojis post={post} />
              <div className="flex justify-between items-center gap-6 mt-2">
                <div className="flex items-center gap-6">
                  <span
                    className={`flex gap-2 items-center text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  >
                    <MessageSquareMore size={16} />{" "}
                    {getTotalComments(post?.postInfo)}
                  </span>
                  <span
                    className={`flex gap-2 items-center text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  >
                    <Smile size={16} /> {getTotalLikes(post?.postInfo)}
                  </span>
                  <span
                    className={`flex gap-2 items-center text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  >
                    <Repeat2 size={16} />
                  </span>
                  <span
                    className={`flex gap-2 items-center text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  >
                    <Gem size={16} /> {post?.postInfo?.gems?.count} (
                    {post?.postInfo?.gems?.value})
                  </span>
                </div>
                <span
                  className={`flex gap-2 items-center text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                >
                  <ChartNoAxesColumn size={16} /> {post?.postInfo?.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
