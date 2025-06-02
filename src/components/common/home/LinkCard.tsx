import Link from "next/link";
import React from "react";

export default function LinkCard({ post }: any) {
  const links = post?.links;

  if (!Array?.isArray(links) || links?.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {links?.map((linkItem: any, index: number) => (
        <div
          key={index}
          className="border dark:border-[#2a323b7e] border-[#ccc] dark:bg-[#13151a] bg-[#F1F1F1] rounded-md flex items-center"
        >
          {/* <div className="w-fit h-full">
        <img
          src={post?.links?.imageSrc}
          alt={post?.image?.alt}
          className="max-w-[147px] max-h-[147px] rounded-l-md object-cover duration-300 ease-in"
        />
      </div> */}
          <div className="flex flex-col gap-1 p-4">
            <Link
              href={linkItem?.link}
              className="text-[#1DA1F2] hover:underline text-[11px]"
            >
              {linkItem?.link}
            </Link>
            <div className="text-base line-clamp-1 font-semibold dark:text-[#A3ADB9] text-[#2f2f2f]">
              {linkItem?.title}
            </div>
            <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999] line-clamp-3">
              {linkItem?.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
