import UserProfileDetails from "@/components/common/userProfile";
import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
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
          <div className="w-full overflow-y-auto">
            <UserProfileDetails />
          </div>
          <RightSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
}
