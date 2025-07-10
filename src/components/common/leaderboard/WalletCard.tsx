import {
  defaultUserProfile,
  sliceMethod,
  useAddFollower,
  useRemoveFollower,
} from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import FollowBtn from "../FollowBtn";
import toast from "react-hot-toast";
import DotsLoader from "../DotsLoader";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";

export default function WalletCard({ item, idx }: any) {
  const { user } = useAuth();
  const followUser = useAddFollower();
  const unFollowUser = useRemoveFollower();
  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Cpoied Successfully`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  const handleFollow = (id: number) => {
    try {
      if (user.id) {
        followUser.mutate({
          id: id,
          followerId: user?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = (id: number) => {
    try {
      if (user.id) {
        unFollowUser.mutate({
          id: id,
          followerId: user?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-[#353450] rounded-lg min-w-[258px] max-w-[258px] drop-shadow-xl/50">
      <div className="flex items-center justify-between gap-4 px-2 pt-1 bg-[#1D1C34] rounded-t-lg">
        <div
          className={`text-lg ${
            idx + 1 === 1 ? "text-[#E0DA20]" : "text-[#FFFFFF]"
          }`}
        >
          #{idx + 1}
        </div>
        <div
          className="text-[8px] text-[#FFFFFF61] flex gap-1 items-start cursor-pointer"
          onClick={() => handleCopy(item?.wallet_address)}
        >
          {sliceMethod(item?.wallet_address)}{" "}
          <CopyIcon size={12} color="#FFFFFF" />
        </div>
      </div>
      <div className="bg-[linear-gradient(177deg,rgba(29,28,52,1)80%,rgba(47,161,93,1)100%)]">
        <Avatar className="size-36 w-full flex justify-center">
          <AvatarImage
            width={258}
            height={144}
            className="h-36 w-full object-fill"
            src={item?.avatar || defaultUserProfile}
          />
          <AvatarFallback>
            <DotsLoader size="w-2 h-2" />
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-center py-1 px-2 font-bold text-[#44FF00] text-xl bg-transparent shadow-lg shadow-[#2FA15D]">
          {item?.assets ? (
            `$
          ${
            item?.assets?.totalBalanceUSD
              ? item?.assets?.totalBalanceUSD?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "0.00"
          }`
          ) : (
            <DotsLoader color="bg-[#44FF00]" />
          )}
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#251F46] to-[#242339] rounded-b-lg pt-6 pb-4 px-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <div>
              <Image
                alt=""
                src={item?.avatar || defaultUserProfile}
                width={40}
                height={40}
                className="rounded-full object-cover min-w-[40px] max-w-[40px] min-h-[40px] max-h-[40px]"
              />
            </div>
            <div>
              <div className="text-base font-medium text-[#FFFFFF] truncate max-w-[80px]">
                {item?.name}
              </div>
              <div className="text-[#999999] text-[10px] truncate max-w-[80px]">
                @{item?.username}
              </div>
            </div>
          </div>
          <FollowBtn handleSubmit={() => handleFollow(item?.id)} />
        </div>
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="text-xs text-[#747474]">
            {item?.followers?.length ?? "0"} followers
          </div>
          <div className="text-xs text-[#747474]">
            {item?.followings?.length ?? "0"} following
          </div>
        </div>
      </div>
    </div>
  );
}
