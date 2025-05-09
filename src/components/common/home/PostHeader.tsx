import React from "react";
import ToolTip from "../tool-tip";
import { Ellipsis, ListTodo, ThumbsDown, ThumbsUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostHeader({ post }: any) {
  const url = usePathname();
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        {url.includes("post") && (
          <Avatar className="size-14">
            <AvatarImage
              width={100}
              height={100}
              className="w-14 h-14 object-cover"
              src={post.user.avatarSrc}
            />
            <AvatarFallback>{post.user.avatarFallback}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col gap-1">
          <div className="hover:underline dark:text-[#DDE5EE] font-semibold flex items-center gap-2">
            {post?.user?.username}{" "}
            {post?.user?.verifiedIcon && (
              <img
                alt="Verified Token"
                data-state="closed"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                className="max-h-max"
                src="/verified.gif"
              />
            )}
            {post?.user?.whaleIcon && (
              <img
                alt="whale"
                data-state="closed"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                data-nimg="1"
                className="inline-flex translate-y-[-10%]"
                src="/cropped-whale-small.webp"
              />
            )}
          </div>
          <div className="text-sm dark:text-[#8C9FB7A0] text-[#999999]">
            {post?.user?.handle} .{" "}
            <ToolTip content={post?.user?.timestamp}>
              {" "}
              {post?.user?.timeAgo}
            </ToolTip>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ListTodo
          className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
          size={20}
        />
        <div
          className={`font-medium text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
        >
          Follow
        </div>
        <div className={`font-medium text-xs text-[#59B4FF] hover:underline`}>
          Subscribe
        </div>
        <div className="hover:bg-[#F1F1F1] dark:hover:bg-[#13151A] rounded-full p-2">
          <Ellipsis
            className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
            size={16}
          />
        </div>
        {url.includes("post") && (
          <div className="flex flex-col justify-center items-center gap-1">
            <ThumbsUp className="text-[#8c9fb7a0]" size={16} />
            <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-sm">
              {post.user.postValue}
            </div>
            <ThumbsDown className="text-[#8c9fb7a0]" size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
