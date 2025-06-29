import { DropdownMenuCheckboxes } from "@/components/common/DropdownMenuCheckboxes";
import ToolTip from "@/components/common/tool-tip";
import UserAssetsData from "@/components/common/user-assets-data";
import { MessageCircleWarning } from "lucide-react";
import React from "react";

export default function TopTokens() {
  return (
    <div className="flex w-full flex-col gap-4 overflow-auto px-4 mt-4 slim-scrollbar">
      <div>
        <div className="z-0 w-full rounded-2xl border border-border-light bg-transparent py-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#999999] dark:text-[#8c9fb7a0]">
              DISCOVER
            </div>
            <div className="relative top-[-2px]">
              <div className="justify-center whitespace-nowrap rounded-full font-sans! ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-link h-6 px-3 text-xs font-normal flex items-center gap-2 py-0 underline-offset-2 hover:underline text-[#999999] dark:text-[#8c9fb7a0]">
                <ToolTip
                  content="The Block Tokens that have the highest trading volume recently."
                  contentClassName="dark:text-[#A3ADB9] dark:bg-[#13151A] max-w-[200px]"
                >
                  <MessageCircleWarning size={20} />
                </ToolTip>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b border-border-light pb-4">
            <DropdownMenuCheckboxes
              btnTitleClassName="bg-transparent dark:text-[#A3ADB9] justify-between"
              items={[
                { name: "Top Joiners" },
                { name: "Top Earners" },
                { name: "Top Tokens" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2 border-b border-border-light py-2">
            <DropdownMenuCheckboxes
              btnTitle={"Filter:"}
              btnTitleClassName="bg-transparent dark:text-[#A3ADB9] justify-start text-xs"
              items={[
                { name: "Last 24 Hours" },
                { name: "Last 7 Days" },
                { name: "Last 30 Days" },
                { name: "All Time" },
              ]}
            />
          </div>
          <UserAssetsData />
        </div>
      </div>
    </div>
  );
}
