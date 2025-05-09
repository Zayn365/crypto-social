"use client";
import PostDetails from "@/components/common/post/PostDetails";
import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function page() {
  return (
    <div>
      <SidebarProvider>
        <LeftSidebar />
        <div className="w-full overflow-y-auto">
          <PostDetails />
        </div>
        <RightSidebar />
      </SidebarProvider>
    </div>
  );
}
