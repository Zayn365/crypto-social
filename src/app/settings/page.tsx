"use client";
import EditProfile from "@/components/common/settings/EditProfile";
import LeftSidebar from "@/components/layout/sidebar/left";
import SideBarTriggerButton from "@/components/layout/sidebar/trigger-btn";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function page() {
  return (
    <div>
      <SidebarProvider>
        <div className="flex lg:flex-row flex-col min-h-screen w-full">
          <LeftSidebar />
          <SideBarTriggerButton />
          <EditProfile />
        </div>
      </SidebarProvider>
    </div>
  );
}
