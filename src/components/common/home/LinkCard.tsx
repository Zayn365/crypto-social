import Link from "next/link";
import React from "react";

export default function LinkCard({ post }: any) {
  return (
    <div className="border dark:border-[#2a323b7e] border-[#ccc] dark:bg-[#13151a] bg-[#F1F1F1] rounded-md flex items-center">
      <div className="w-fit h-full">
        <img
          src={post?.content?.link?.imageSrc}
          alt={post?.content?.image?.alt}
          className="max-w-[147px] max-h-[147px] rounded-l-md object-cover duration-300 ease-in"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <Link
          href={post?.content?.link?.url}
          className="text-[#1DA1F2] hover:underline text-[11px]"
        >
          {post?.content?.link?.url}
        </Link>
        <div className="text-base line-clamp-1 font-semibold dark:text-[#A3ADB9] text-[#2f2f2f]">
          {post?.content?.link?.title}
        </div>
        <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999] line-clamp-3">
          {post?.content?.link?.description}
        </div>
      </div>
    </div>
  );
}
