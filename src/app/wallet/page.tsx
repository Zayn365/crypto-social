"use client";
import WalletComp from "@/components/common/wallet";
import LeftSidebar from "@/components/layout/sidebar/left";
import SideBarTriggerButton from "@/components/layout/sidebar/trigger-btn";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function Wallet() {

  return (
    <div>
      <SidebarProvider>
        <div className="flex lg:flex-row flex-col min-h-screen w-full">
          <LeftSidebar />
          <SideBarTriggerButton />
          <WalletComp />
        </div>
      </SidebarProvider>
    </div>
  );
}
