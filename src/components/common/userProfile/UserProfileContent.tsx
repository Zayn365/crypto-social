"use client";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Images,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import NoDataFoundScreen from "./NoDataFoundScreen";
import { useParams, useRouter } from "next/navigation";
import { DropdownMenuCheckboxes } from "../DropdownMenuCheckboxes";
import PostCard from "../home/PostCard";
import Image from "next/image";

export default function UserProfileContent({ data }: any) {
  const { id, slug } = useParams();
  const router = useRouter();

  const [active, setActive] = useState<string>(slug ? String(slug) : "feed");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openPreview = (allImages: string[], startIndex: number) => {
    setPreviewImages(allImages);
    setCurrentImageIndex(startIndex);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (previewImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % previewImages.length);
    }
  };

  const prevImage = () => {
    if (previewImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? previewImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div>
      <div className="border-y flex items-center gap-4 justify-center py-1.5">
        <div
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            active === "feed"
              ? "text-[#000000] dark:text-[#DDE5EE]"
              : "text-[#999999] dark:text-[#8C9FB7A0]"
          }`}
          onClick={() => {
            router.replace(`/${id}/feed`);
            setActive("feed");
          }}
        >
          <Globe size={14} />
          Feed
        </div>
        <div
          className={`flex items-center gap-2 text-sm cursor-pointer ${
            active === "media"
              ? "text-[#000000] dark:text-[#DDE5EE]"
              : "text-[#999999] dark:text-[#8C9FB7A0]"
          }`}
          onClick={() => {
            router.replace(`/${id}/media`);
            setActive("media");
          }}
        >
          <Images size={16} />
          Media
        </div>
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm">
          Content <ChevronDown size={14} />
        </div>
        {active === "feed" && (
          <DropdownMenuCheckboxes
            btnTitle={"Sort:"}
            btnTitleClassName="bg-transparent dark:text-[#A3ADB9] justify-start text-xs"
            contentClassName="w-fit"
            items={[{ name: `Hot` }, { name: `Latest` }]}
          />
        )}
      </div>
      {active === "media" ? (
        data?.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-2">
            {data
              .filter((post: any) =>
                post?.files?.some((file: any) => file?.image)
              )
              .map((post: any, postIndex: number) => {
                const imageFiles = post?.files.filter(
                  (file: any) => file?.image
                );
                return imageFiles.map((file: any, fileIndex: number) => (
                  <div
                    key={`${postIndex}-${fileIndex}`}
                    className="break-inside-avoid mb-4 cursor-pointer"
                    onClick={() =>
                      openPreview(
                        imageFiles.map((f: any) => f.image),
                        fileIndex
                      )
                    }
                  >
                    <Image
                      src={file?.image}
                      alt={post?.title || "Media image"}
                      width={300}
                      height={300}
                      className="object-contain rounded-md w-full h-full"
                    />
                  </div>
                ));
              })}
          </div>
        ) : (
          <NoDataFoundScreen />
        )
      ) : data?.length > 0 ? (
        <PostCard allPost={data} />
      ) : (
        <NoDataFoundScreen />
      )}

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={closePreview}
          >
            <X size={30} className="cursor-pointer" />
          </button>
          {/* <button className="absolute left-4" onClick={prevImage}>
            <ChevronLeft size={30} className="cursor-pointer" />
          </button> */}
          <Image
            src={previewImages[currentImageIndex]}
            alt="Preview"
            width={800}
            height={600}
            className="max-w-full max-h-[80vh] object-contain rounded"
          />
          {/* <button className="absolute right-4" onClick={nextImage}>
            <ChevronRight size={30} className="cursor-pointer" />
          </button> */}
        </div>
      )}
    </div>
  );
}
