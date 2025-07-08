import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotsLoader from "../DotsLoader";

export default function NoDataFoundScreen() {
  const { id, slug } = useParams();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full h-[50vh] p-4">
      {/* <Image
        src={slug === "media" ? "/empty-32.webp" : "/empty-24.webp"}
        alt="Banner"
        objectFit="cover"
        className="max-w-[160px]"
        width={160}
        height={160}
      /> */}
      <Avatar className="size-40">
        <AvatarImage
          width={160}
          height={160}
          className="max-w-[160px]"
          src={slug === "media" ? "/main-logo.png" : "/main-logo.png"}
        />
        <AvatarFallback>{<DotsLoader />}</AvatarFallback>
      </Avatar>
      <div className="text-[#000000] dark:text-[#DDE5EE] text-xl font-medium mt-4">
        {slug === "media" ? "No images or videos found." : `No posts`}
      </div>
      <div className="text-[#999999] dark:text-[#8C9FB7A0]">
        {slug === "media"
          ? "Check back later for more content."
          : `not posted any content yet.`}
      </div>
      {slug === "media" ? (
        ""
      ) : (
        <></>
        // <BuyTokenBtn
        //   onClick={() => router.replace(`/discover`)}
        //   clasName="mt-4 h-10"
        // >
        //   Find Active Users
        // </BuyTokenBtn>
      )}
    </div>
  );
}
