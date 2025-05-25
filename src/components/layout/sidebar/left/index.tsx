"use client";
import BuyTokenBtn from "@/components/common/buy-token-btn";
import CreateImportWalletBtn from "@/components/common/create-import-wallet-btn";
import CreateImportWalletModal from "@/components/common/CreateImportWalletModal";
import CreatePostModal from "@/components/common/CreatePostModal";
import FillButton from "@/components/common/FillButton";
import UserInfoCard from "@/components/common/UserInfoCard";
import WalletButton from "@/components/common/WalletButton";
import { BuyTokenIcon } from "@/components/svg/buy-token";
import { BountiesIcon } from "@/components/svg/sidebar/bounties";
import { DiscoverIcon } from "@/components/svg/sidebar/discover";
import { EarningIcon } from "@/components/svg/sidebar/earning";
import { FeedIcon } from "@/components/svg/sidebar/feed";
import { HomeIcon } from "@/components/svg/sidebar/home";
import { ProfileIcon } from "@/components/svg/sidebar/profile";
import { SettingsIcon } from "@/components/svg/sidebar/settings";
import { TradeIcon } from "@/components/svg/sidebar/trade";
import { WalletIcon } from "@/components/svg/sidebar/wallet";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/AuthProvider";
import { useAppKitAccount } from "@reown/appkit/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function LeftSidebar() {
  const { theme, setTheme } = useTheme();
  const { status } = useAppKitAccount();
  const [walletModal, setWalletModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const handleWalletModal = () => {
    setWalletModal(!walletModal);
  };

  const items = [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Discover",
      url: "/discover",
      icon: DiscoverIcon,
    },
    {
      title: "Bounties (coming soon)",
      url: "#",
      icon: BountiesIcon,
    },
    {
      title: "Feed Store (coming soon)",
      url: "#",
      icon: FeedIcon,
    },
    {
      title: "Trade (coming soon)",
      url: "#",
      icon: TradeIcon,
    },
    {
      title: "Earnings",
      url: "/earnings",
      icon: EarningIcon,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: WalletIcon,
    },
    ...(user?.username
      ? [
          {
            title: "Profile",
            url: `/${user?.username}`,
            icon: ProfileIcon,
          },
        ]
      : []),
    ...(user
      ? [
          {
            title: "Settings",
            url: `/settings`,
            icon: SettingsIcon,
          },
        ]
      : []),
  ];

  return (
    <Sidebar
      side="left"
      className="hidden justify-start max-w-[280px] border-r lg:flex dark:bg-[#040609] bg-[#FFFFFF] h-screen overflow-y-auto slim-scrollbar"
    >
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="flex py-6 items-start dark:bg-[#040609] bg-[#FFFFFF]">
        <div className="flex justify-between items-center px-5 w-full text-3xl font-extrabold">
          focus
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border rounded-full p-2 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content with Navigation Items */}
      <SidebarContent className="dark:bg-[#040609] bg-[#FFFFFF] px-4">
        <SidebarMenu className="gap-1 mt-4">
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <Link href={item?.url}>
                <SidebarMenuButton
                  className={`flex h-[40px] px-5 rounded-3xl cursor-pointer dark:hover:bg-[#13151a] ${
                    pathname === item.url ? "dark:bg-[#13151a]" : ""
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span className="text-[16px] font-[400]">{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-4">
          <div className="flex w-full flex-col flex-wrap items-center gap-4 py-4">
            {status !== "connected" ? (
              <CreateImportWalletBtn handleClick={handleWalletModal} />
            ) : (
              <WalletButton />
            )}
            <div className="flex flex-wrap justify-center gap-4 flex-col w-full">
              <BuyTokenBtn clasName="min-w-full">
                <BuyTokenIcon /> Buy $FOCUS
              </BuyTokenBtn>
            </div>
          </div>
        </div>
        {user?.username && (
          <div className="w-full">
            <FillButton className="w-full" onClick={() => setPostModal(true)}>
              Post
            </FillButton>
          </div>
        )}
        {user?.username && (
          <div className="my-4">
            <UserInfoCard />
          </div>
        )}
      </SidebarContent>

      <CreateImportWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
      <CreatePostModal open={postModal} onClose={() => setPostModal(false)} />
    </Sidebar>
  );
}
