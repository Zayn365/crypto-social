import { User, Users } from "lucide-react";
import React from "react";

export default function FollowersFollowing({ data }: any) {
  return (
    <div className="flex space-x-4 mt-2 dark:text-[#8c9fb7a0] text-[#999999]">
      <div className="hover:text-[#2F2F2F] dark:hover:text-[#A3ADB9] cursor-pointer flex items-center gap-2 max-md:text-xs">
        <Users size={20} />
        <span className="text-[#A3ADB9] font-semibold">
          {data.followers.count}
        </span>
        Followers
      </div>
      <div className="hover:text-[#2F2F2F] dark:hover:text-[#A3ADB9] cursor-pointer flex items-center gap-2 max-md:text-xs">
        <User size={20} />
        <span className="text-[#A3ADB9] font-semibold">
          {data.following.count}
        </span>
        Following
      </div>
    </div>
  );
}
