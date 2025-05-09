import React from "react";

export default function PostEmojis({ post }: any) {
  return (
    <div className="mt-2 flex items-center gap-1">
      {post?.interactions?.emojis?.map((emoji: any, idx: any) => (
        <div
          key={idx}
          className="dark:bg-[#13151A] bg-[#F1F1F1] flex items-center rounded-full p-0.5"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
