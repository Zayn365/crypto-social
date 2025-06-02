import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function ContentCard({ post }: any) {
  const descriptionHTML = post?.description ?? "";
  const images = post?.files?.filter((f: any) => f?.image);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement;
    if (target.tagName === "IMG" && target.src) {
      setPreviewImage(target.src);
    }
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    // <div className="flex flex-col gap-2">
    //   <div className="text-sm dark:text-[#A3ADB9] text-[#2f2f2f] whitespace-pre-line">
    //     {post?.content?.text}
    //   </div>
    //   <div className="flex items-center gap-2">
    //     {post?.content?.hashtags?.map((tag: any, idx: any) => (
    //       <span key={idx} className="text-[#59B4FF]">
    //         {tag}
    //       </span>
    //     ))}
    //   </div>
    //   <div className="flex items-center gap-2">
    //     <img
    //       src={post?.content?.image?.src}
    //       alt={post?.content?.image?.alt}
    //       className="w-full h-auto rounded-md border"
    //     />
    //   </div>
    // </div>
    <div className="flex flex-col gap-4">
      {/* Render Description as HTML */}
      {descriptionHTML && (
        <div
          className={cn(
            "prose prose-sm max-w-none dark:prose-invert text-[#2f2f2f] dark:text-[#A3ADB9]",
            "[&_img]:max-w-[500px] [&_img]:max-h-[500px] [&_img]:w-full [&_img]:h-auto [&_img]:object-cover"
          )}
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          onClick={handleImageClick}
        />
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            <button
              onClick={closePreview}
              className="absolute top-2 -right-5 rounded-full bg-gray-800 text-red-500 hover:bg-gray-700 cursor-pointer px-3 py-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Render Images */}
      {/* {images?.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {images.map((img: any, idx: number) => (
            <img
              key={idx}
              src={img.image}
              alt={`post-image-${idx}`}
              className="rounded-md max-w-full max-h-[400px] object-cover border"
            />
          ))}
        </div>
      )} */}
    </div>
  );
}
