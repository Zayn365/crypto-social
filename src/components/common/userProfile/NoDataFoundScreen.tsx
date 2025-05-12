import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import BuyTokenBtn from "../buy-token-btn";

export default function NoDataFoundScreen() {
  const { id, slug } = useParams();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full h-[50vh] p-4">
      <Image
        src={slug === "media" ? "/empty-32.webp" : "/empty-24.webp"}
        alt="Banner"
        objectFit="cover"
        className="max-w-[160px]"
        width={160}
        height={160}
      />
      <div className="text-[#000000] dark:text-[#DDE5EE] text-xl font-medium mt-4">
        {slug === "media"
          ? "No images or videos found."
          : `No posts from @${id}`}
      </div>
      <div className="text-[#999999] dark:text-[#8C9FB7A0]">
        {slug === "media"
          ? "Check back later for more content."
          : `@${id} has not posted any content yet.`}
      </div>
      {slug === "media" ? (
        ""
      ) : (
        <BuyTokenBtn
          onClick={() => router.replace(`/discover`)}
          clasName="mt-4 h-10"
        >
          Find Active Users
        </BuyTokenBtn>
      )}
    </div>
  );
}
