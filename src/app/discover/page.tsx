import DiscoverHeader from "@/components/common/discover/DiscoverHeader";
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
          <DiscoverHeader />
        </div>
        <RightSidebar />
      </SidebarProvider>
    </div>
  );
}
