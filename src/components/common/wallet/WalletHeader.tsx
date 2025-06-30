import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import InputWithIcons from "../input-with-icons";
import { Search } from "lucide-react";
import { defaultUserProfile, sliceMethod } from "@/lib/utils";
import DotsLoader from "../DotsLoader";

export default function WalletHeader({
  search,
  handleSearch,
  data,
  allUsers,
  onUserSelect,
}: {
  search?: string;
  handleSearch?: any;
  data?: any;
  allUsers?: any;
  onUserSelect?: (user: any) => void;
}) {
  const [active, setActive] = useState<boolean>(false);

  const filteredUsers = allUsers?.filter((item: any) =>
    search
      ? item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.username?.toLowerCase().includes(search.toLowerCase()) ||
        item?.wallet_address?.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex rounded-md transition-colors bg-transparent dark:text-[#a3adb9] text-[#000] dark:hover:text-white p-2 items-center gap-2 cursor-pointer">
        <div>
          <Avatar className="size-14">
            <AvatarImage
              width={100}
              height={100}
              className="rounded-full border object-cover"
              src={data?.avatar ?? defaultUserProfile}
            />
            <AvatarFallback>
              <DotsLoader size="w-2 h-2" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-xl dark:text-[#FFFFFF] text-[#000]">
            {data?.name} Wallet
          </h1>
          <h2 className="text-sm">@{data?.username}</h2>
        </div>
      </div>
      <div className="p-4 relative">
        <InputWithIcons
          placeholder="Search any user..."
          endIcon={<Search size={16} />}
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
            setActive(e.target.value.length > 0);
          }}
          onFocus={() => setActive((search ?? "").length > 0)}
          onBlur={() => setTimeout(() => setActive(false), 200)}
        />
        {active && filteredUsers?.length > 0 && (
          <div className="bg-[#FFFFFF] dark:bg-[#000] p-2 rounded-md flex flex-col gap-2 border w-full max-h-80 overflow-y-auto absolute top-[60px] right-0 z-20">
            {filteredUsers.map((item: any, idx: any) => (
              <div
                key={idx}
                className="flex gap-2 justify-between items-center border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md flex-wrap"
                onClick={() => {
                  onUserSelect?.(item);
                  setActive(false);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Avatar className="size-8">
                    <AvatarImage
                      width={100}
                      height={100}
                      className="rounded-full border object-cover w-8 h-8"
                      src={item?.avatar ?? defaultUserProfile}
                    />
                    <AvatarFallback>
                      <DotsLoader size="w-2 h-2" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{item?.name}</div>
                    <div className="text-sm text-gray-500">
                      @{item?.username}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {sliceMethod(item?.wallet_address)}
                </div>
              </div>
            ))}
          </div>
        )}
        {active && filteredUsers?.length === 0 && (
          <div className="bg-[#FFFFFF] dark:bg-[#000] p-2 rounded-md flex flex-col gap-2 border w-full absolute top-[60px] right-0 z-20">
            <div className="text-sm text-gray-500 p-2">No results found</div>
          </div>
        )}
      </div>
    </div>
  );
}
