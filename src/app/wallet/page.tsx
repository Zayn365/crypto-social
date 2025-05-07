import InputWithIcons from "@/components/common/input-with-icons";
import UserAssetsData from "@/components/common/user-assets-data";
import LeftSidebar from "@/components/layout/sidebar/left";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import React from "react";

export default function Wallet() {
  return (
    <div>
      <SidebarProvider>
        <LeftSidebar />
        <div className="w-full flex justify-center items-center px-4 py-2">
          <div className="flex flex-col items-center max-w-[550px] gap-4">
            <img
              alt="whale"
              data-state="closed"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="inline-flex translate-y-[-10%]"
              src="/empty-18.webp"
            />
            <div className="font-semibold text-2xl dark:text-[#DDE5EE]">
              Search Wallets
            </div>
            <div className="text-sm text-[#999999] dark:text-[#8c9fb7a0] text-center">
              On Focus, all assets & holdings are publicly viewable so you can
              get deeper insights into who you&rsquo;re interacting with.
            </div>
            <div className="w-full">
              <InputWithIcons
                placeholder="Search users..."
                className="w-full"
                endIcon={<Search size={16} />}
              />
            </div>
            <div className="w-full rounded-2xl border border-border-light">
              <UserAssetsData />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
