import { cn } from "@/lib/utils";
import React from "react";
import { useEffect, useState } from "react";

export default function ContentCard({ post }: any) {
  const descriptionHTML = post?.description ?? "";
  const [videos, setVideos] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const processDescription = async () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post?.description ?? "", "text/html");

      // Extract iframe src for videos
      const iframes = doc.querySelectorAll("iframe");
      const videoSources = Array.from(iframes)
        .map((iframe) => iframe.getAttribute("src") || "")
        .filter((src) => src);

      // Remove iframes from description for sanitization
      iframes.forEach((iframe) => iframe.remove());

      if (isMounted) {
        setVideos(videoSources);
      }
    };

    processDescription();
    return () => {
      isMounted = false;
    };
  }, [post?.description]);

  const images = post?.files?.filter((f: any) => f?.image) || [];
  const descriptionText = descriptionHTML.replace(/<[^>]+>/g, " ").trim();

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
        <h2 className="text-base text-[#2f2f2f] dark:text-[#A3ADB9] capitalize">
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

      {/* Render Video */}
      {videos.length > 0 && (
        <div className="flex flex-col gap-4">
          {videos.map((src, idx) => (
            <iframe
              key={idx}
              src={src}
              className="w-full aspect-video rounded-md border"
              allowFullScreen
              title={`Video ${idx + 1}`}
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
