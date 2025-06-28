import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import InputWithIcons from "../input-with-icons";
import { Search } from "lucide-react";

export default function WalletHeader() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between">
      <div className="flex rounded-md transition-colors bg-transparent dark:text-[#a3adb9] text-[#000] dark:hover:text-white p-2 items-center gap-2 cursor-pointer">
        <div>
          <Avatar className="size-14">
            <AvatarImage
              width={100}
              height={100}
              className="rounded-full border object-cover"
              src={user?.avatar ?? "/userDefault.webp"}
            />
            <AvatarFallback>{""}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-xl dark:text-[#FFFFFF] text-[#000]">
            {user?.name} Wallet
          </h1>
          <h2 className="text-sm">@{user?.username}</h2>
        </div>
      </div>
      <div className="p-4">
        <InputWithIcons
          placeholder="Search any user..."
          endIcon={<Search size={16} />}
        />
      </div>
    </div>
  );
}
