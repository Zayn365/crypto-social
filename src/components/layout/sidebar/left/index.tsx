"use client";
import BuyTokenBtn from "@/components/common/buy-token-btn";
import CreateImportWalletBtn from "@/components/common/create-import-wallet-btn";
import CreateImportWalletModal from "@/components/common/CreateImportWalletModal";
import WalletButton from "@/components/common/WalletButton";
import { BuyTokenIcon } from "@/components/svg/buy-token";
import { BountiesIcon } from "@/components/svg/sidebar/bounties";
import { DiscoverIcon } from "@/components/svg/sidebar/discover";
import { EarningIcon } from "@/components/svg/sidebar/earning";
import { FeedIcon } from "@/components/svg/sidebar/feed";
import { HomeIcon } from "@/components/svg/sidebar/home";
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
import { useWallet } from "@/context/WalletContext";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function LeftSidebar() {
  const { theme, setTheme } = useTheme();
  const [walletModal, setWalletModal] = useState<boolean>(false);
  const { connection } = useWallet();
  const pathname = usePathname();

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
      url: "#",
      icon: DiscoverIcon,
    },
    {
      title: "Bounties",
      url: "#",
      icon: BountiesIcon,
    },
    {
      title: "Feed Store",
      url: "#",
      icon: FeedIcon,
    },
    {
      title: "Trade",
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
  ];

  return (
    <Sidebar
      side="left"
      className="hidden justify-start border-r lg:flex dark:bg-[#040609] bg-[#FFFFFF] fixed"
    >
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="flex py-6 items-start dark:bg-[#040609] bg-[#FFFFFF]">
        <div className="flex justify-between items-center px-5 w-full">
          Focus
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
        <div className="mx-4 mt-4 rounded-2xl border dark:bg-[#080A0E] lg:mx-0 lg:ml-4">
          <div className="m-auto flex w-full flex-col flex-wrap items-center gap-4 py-4 px-2">
            {connection.address === null ? (
              <CreateImportWalletBtn handleClick={handleWalletModal} />
            ) : (
              <WalletButton />
            )}
            <div className="flex flex-wrap justify-center gap-4 flex-col w-auto">
              <BuyTokenBtn>
                <BuyTokenIcon /> Buy $FOCUS
              </BuyTokenBtn>
            </div>
          </div>
        </div>
      </SidebarContent>

      <CreateImportWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
    </Sidebar>
  );
}
