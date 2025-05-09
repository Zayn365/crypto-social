import React from "react";

export default function ContentCard({ post }: any) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm dark:text-[#A3ADB9] text-[#2f2f2f] whitespace-pre-line">
        {post?.content?.text}
      </div>
      <div className="flex items-center gap-2">
        {post?.content?.hashtags?.map((tag: any, idx: any) => (
          <span key={idx} className="text-[#59B4FF]">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <img
          src={post?.content?.image?.src}
          alt={post?.content?.image?.alt}
          className="w-full h-auto rounded-md border"
        />
      </div>
    </div>
  );
}
