"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import FollowersFollowing from "./FollowersFollowing";
import Stats from "./Stats";

export default function ProjectInfoCard({ data }: any) {
  const router = useRouter();
  return (
    <div className="text-white rounded-lg shadow-lg w-full overflow-hidden border hover:bg-[#F9F9F9] dark:hover:bg-[#080A0E]">
      {/* Banner Image */}
      <div
        className="relative min-h-32 w-full overflow-hidden rounded-t-2xl"
        style={
          {
            maskImage:
              "linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
          } as React.CSSProperties
        }
      >
        <Image
          src={data.profile.bannerImage}
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>

      {/* Profile Section */}
      <div className="-mt-12 p-6">
        {/* Profile Picture */}
        <div className="">
          <div className="flex items-center gap-2">
            <Avatar className="size-14">
              <AvatarImage
                width={100}
                height={100}
                className="rounded-full border object-cover"
                src={data.profile.profilePicture}
              />
              <AvatarFallback>{""}</AvatarFallback>
            </Avatar>
            <div className="relative z-10 flex justify-between items-center">
              <div>
                <h1
                  onClick={() => router.replace(`/${data.profile.name}`)}
                  className="text-base hover:underline cursor-pointer dark:text-[#DDE5EE] text-[#000000] font-bold flex items-center gap-2"
                >
                  {data.profile.name}
                  {data.profile.verified && (
                    <>
                      <img
                        alt="Verified Token"
                        data-state="closed"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        data-nimg="1"
                        className="max-h-max"
                        src="/verified.gif"
                      />
                      <img
                        alt="whale"
                        data-state="closed"
                        loading="lazy"
                        width="20"
                        height="20"
                        decoding="async"
                        data-nimg="1"
                        className="inline-flex translate-y-[-10%]"
                        src="/cropped-whale-small.webp"
                      />
                    </>
                  )}
                </h1>
                <p className="text-sm dark:text-[#8c9fb7a0] text-[#999999]">
                  {data.profile.handle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <FollowersFollowing data={data} />
        <Stats data={data} />
      </div>
    </div>
  );
}
