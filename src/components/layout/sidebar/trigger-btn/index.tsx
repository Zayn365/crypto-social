import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function SideBarTriggerButton() {
  return (
    <div className="flex justify-between p-4 lg:hidden sticky top-0 z-10 dark:bg-[#040609] bg-[#FFFFFF]">
      <SidebarTrigger side="left">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
      <div className="text-3xl font-extrabold">focus</div>
      <SidebarTrigger side="right">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
    </div>
  );
}
