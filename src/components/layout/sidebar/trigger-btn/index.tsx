"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function SideBarTriggerButton() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-between p-4 lg:hidden sticky top-0 z-10 dark:bg-[#040609] bg-[#FFFFFF]">
      <SidebarTrigger side="left">
        <Menu className="h-6 w-6" />
      </SidebarTrigger>
      <Image
        src={
          theme === "dark"
            ? "/blockface-logo white.svg"
            : "/blockface-logo-dark.svg"
        }
        alt="logo"
        width={150}
        height={100}
      />
      <div></div>
      {/* <SidebarTrigger side="right">
        <Menu className="h-6 w-6" />
      </SidebarTrigger> */}
    </div>
  );
}
