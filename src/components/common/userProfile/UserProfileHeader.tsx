import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Ellipsis, Gem, ListTodo, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import FollowersFollowing from "../discover/FollowersFollowing";
import Stats from "../discover/Stats";
import { useParams } from "next/navigation";

export default function UserProfileHeader({ data }: any) {
  const { id } = useParams();
  return (
    <div className="pb-4">
      <div className="relative w-full">
        <Image
          src={data?.profile?.bannerImage ?? "/empty-39.webp"}
          alt="Banner"
          className="object-cover w-full min-h-52"
          width={700}
          height={200}
        />
      </div>
      <div className="relative flex items-center justify-between gap-2 p-6">
        <div className="-mt-20">
          <Avatar className="size-28">
            <AvatarImage
              width={100}
              height={100}
              className="rounded-full border object-cover max-w-[112px]"
              src={data?.profile?.profilePicture ?? "/userDefault.webp"}
            />
            <AvatarFallback>{data?.profile?.profilePicture}</AvatarFallback>
          </Avatar>
        </div>
        <div className="h-fit flex items-center gap-2">
          <span className="text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer border">
            <Ellipsis size={16} />
          </span>
          <span className="text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer border">
            <Gem size={16} />
          </span>
          <span className="text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer border">
            <Mail size={16} />
          </span>
          <div
            className={cn(
              "justify-center whitespace-nowrap rounded-full font-sans! text-sm font-medium transition-colors border dark:border-[#2a323b7e] bg-transparent hover:bg-[#F1F1F1] dark:hover:bg-[#13151a] px-3 flex items-center gap-2 py-2 cursor-pointer"
            )}
          >
            <span className="dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]">
              <ListTodo size={16} />
            </span>
            <span className="dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]">
              Follow
            </span>
          </div>
        </div>
      </div>

      <div className="px-6">
        <h1 className="text-lg dark:text-[#DDE5EE] text-[#000000] font-bold flex items-center gap-2">
          {data?.profile?.name}
          {data?.profile?.verified && (
            <>
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
          <p className="text-sm dark:text-[#8c9fb7a0] text-[#999999] font-normal">
            {data?.profile?.handle ?? id}
          </p>
        </h1>
        <FollowersFollowing data={data} />
      </div>

      {data?.stats && (
        <div className="px-6 mt-4">
          <Stats data={data} />
        </div>
      )}
    </div>
  );
}
