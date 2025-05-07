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
      className="relative hidden w-[300px] justify-start border-l lg:flex dark:bg-[#040609] pl-1"
    >
      <SidebarContent className="dark:bg-[#040609]">
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
