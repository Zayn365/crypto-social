import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function ContentCard({ post }: any) {
  const htmlToPlainText = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return doc.body.textContent?.trim() || "";
  };

  const descriptionHTML = post?.description ?? "";
  const images = post?.files?.filter((f: any) => f?.image) || [];
  // const descriptionText = htmlToPlainText(descriptionHTML);
  const descriptionText = descriptionHTML.replace(/<[^>]+>/g, " ").trim();

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
    <div className="flex flex-col gap-4 relative">
      {/* Render Title */}
      {post?.title && (
        <h2 className="text-xl font-bold text-[#2f2f2f] dark:text-[#A3ADB9] capitalize">
          {post?.title}
        </h2>
      )}
      {/* Render Description as HTML */}
      {descriptionText && (
        <div
          className={cn(
            "prose prose-sm max-w-none dark:prose-invert text-[#2f2f2f] dark:text-[#A3ADB9] break-all"
            // "[&_img]:max-w-[500px] [&_img]:max-h-[500px] [&_img]:w-full [&_img]:h-auto [&_img]:object-cover"
          )}
          // dangerouslySetInnerHTML={{ __html: descriptionHTML }}
          onClick={handleImageClick}
        >
          {descriptionText}
        </div>
      )}

      {/* Render Images */}
      {images.length > 0 && (
        <div
          className={`${
            images.length === 1
              ? "grid-cols-1"
              : images.length === 2
              ? "grid-cols-2"
              : images.length === 3
              ? "grid-cols-3"
              : "grid-cols-2 grid-rows-2"
          } grid gap-4`}
        >
          {images.map((img: any, idx: number) => (
            <img
              key={idx}
              src={img.image}
              alt={`post-image-${idx}`}
              className="rounded-md w-full max-h-[500px] object-contain border cursor-pointer"
              onClick={() => setPreviewImage(img.image)}
            />
          ))}
        </div>
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
              className="fixed top-2 right-5 rounded-full bg-gray-800 text-red-500 hover:bg-gray-700 cursor-pointer px-3 py-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
