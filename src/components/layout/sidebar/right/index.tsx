import InputWithIcons from "@/components/common/input-with-icons";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import React from "react";
import Market from "./market";
import TopTokens from "./top-tokens";

export default function RightSidebar() {
  return (
    <Sidebar
      side="right"
      className="hidden max-w-[280px] justify-start border-l lg:flex dark:bg-[#1d1c34] bg-[#FFFFFF] h-screen overflow-y-auto slim-scrollbar sticky top-0"
    >
      <SidebarContent className="dark:bg-[#1d1c34] bg-[#FFFFFF]">
        <div>
          <div className="p-4">
            <InputWithIcons
              placeholder="Search..."
              endIcon={<Search size={16} />}
            />
          </div>
          <Market />
          <TopTokens />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
