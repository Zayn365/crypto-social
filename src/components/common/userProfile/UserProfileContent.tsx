"use client";
import { ChevronDown, Globe, Images } from "lucide-react";
import React, { useState } from "react";
import NoDataFoundScreen from "./NoDataFoundScreen";
import { useParams, useRouter } from "next/navigation";
import { DropdownMenuCheckboxes } from "../DropdownMenuCheckboxes";

export default function UserProfileContent({ data }: any) {
  const { id, slug } = useParams();
  const router = useRouter();
  const [active, setActive] = useState<string>(slug ? String(slug) : "feed");
  console.log("🚀 ~ UserProfileContent ~ active:", active, typeof active);
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
      <NoDataFoundScreen />
    </div>
  );
}
