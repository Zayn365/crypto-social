"use client";
import BuyTokenBtn from "@/components/common/buy-token-btn";
import CreateImportWalletBtn from "@/components/common/create-import-wallet-btn";
import CreateImportWalletModal from "@/components/common/CreateImportWalletModal";
import CreatePostModal from "@/components/common/CreatePostModal";
import FillButton from "@/components/common/FillButton";
import ShareModal from "@/components/common/ShareModal";
import SocialHandle from "@/components/common/SocialHandle";
import UserInfoCard from "@/components/common/UserInfoCard";
import { BuyTokenIcon } from "@/components/svg/buy-token";
import { SettingsIcon } from "@/components/svg/sidebar/settings";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useUrl from "@/hooks/useUrl";
import { cn, sliceMethod } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Moon, Sun, Upload } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LeftSidebar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { host, pathname } = useUrl();

  const [walletModal, setWalletModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleWalletModal = () => {
    setWalletModal(!walletModal);
  };

  const items = [
    {
      title: "Home",
      url: "/",
      icon: "/home-icon.svg",
    },
    {
      title: "Leaderboard",
      url: "/leaderboard",
      icon: "/leaderboard-icon.svg",
    },
    {
      title: "Communities",
      url: "#",
      icon: "/community-icon.svg",
      type: "coming soon",
    },
    ...(user
      ? [
          {
            title: "Wallet",
            url: "/wallet",
            icon: "/wallet-icon.svg",
          },
        ]
      : []),
    ...(user?.username
      ? [
          {
            title: "Profile",
            url: `/${user?.id}`,
            icon: "/profile-icon.svg",
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

  const renderIcon = (icon: string | React.ComponentType) => {
    if (typeof icon === "string") {
      return <Image src={icon} alt="icon" width={20} height={20} />;
    } else if (icon) {
      const IconComponent = icon;
      return <IconComponent />;
    }
    return null;
  };

  return (
    <Sidebar
      side="left"
      className="hidden justify-start max-w-[280px] border-r lg:flex dark:bg-[#1d1c34] bg-[#FFFFFF] h-screen overflow-y-auto slim-scrollbar sticky top-0"
    >
      {/* Sidebar Header with Logo */}
      <SidebarHeader className="flex py-2 items-start dark:bg-[#1d1c34] bg-[#FFFFFF]">
        <div className="flex justify-between items-center px-5 w-full">
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
          <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border rounded-full p-2 cursor-pointer"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content with Navigation Items */}
      <SidebarContent className="dark:bg-[#1d1c34] bg-[#FFFFFF] px-4">
        <SidebarMenu className="gap-1 mt-4">
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              {/* <Link href={item?.url}>
                <SidebarMenuButton
                  className={`flex h-[40px] px-5 rounded-3xl cursor-pointer dark:hover:bg-[#13151a] ${
                    pathname === item.url ? "dark:bg-[#13151a]" : ""
                  }`}
                >
                  {renderIcon(item.icon)}
                  <span
                    className={cn(
                      "text-[16px] font-[400]",
                      `${
                        item?.type === "coming soon" &&
                        "dark:text-[#FFFFFF80] text-[#00000080]"
                      }`
                    )}
                  >
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </Link> */}
              {item?.type === "coming soon" ? (
                <div onClick={() => toast("Coming soon!")} className="w-full">
                  <SidebarMenuButton className="flex h-[40px] px-5 rounded-3xl cursor-pointer dark:hover:bg-[#13151a]">
                    {renderIcon(item.icon)}
                    <span className="text-[16px] font-[400] dark:text-[#FFFFFF80] text-[#00000080]">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </div>
              ) : (
                <Link href={item?.url}>
                  <SidebarMenuButton
                    className={`flex h-[40px] px-5 rounded-3xl cursor-pointer dark:hover:bg-[#13151a] ${
                      pathname === item.url ? "dark:bg-[#13151a]" : ""
                    }`}
                  >
                    {renderIcon(item.icon)}
                    <span className="text-[16px] font-[400]">{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              )}{" "}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="mt-4">
          <div className="flex w-full flex-col flex-wrap items-center gap-4 py-4">
            {!user?.wallet_address ? (
              <CreateImportWalletBtn handleClick={handleWalletModal} />
            ) : (
              <div className="rounded-full px-4 py-2 border border-[#FFFFFF1A]">
                {sliceMethod(user?.wallet_address)}
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-4 flex-col w-full">
              <BuyTokenBtn clasName="min-w-full">
                <BuyTokenIcon /> Buy $BLOCK
              </BuyTokenBtn>
              <BuyTokenBtn
                clasName="min-w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Upload /> Share
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
          <div className="mt-4">
            <UserInfoCard />
          </div>
        )}
        <div className="w-full flex justify-center items-center my-4">
          <SocialHandle />
        </div>
      </SidebarContent>

      <CreateImportWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
      <CreatePostModal open={postModal} onClose={() => setPostModal(false)} />
      <ShareModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        referralLink={`${host}${pathname}`}
        currentPageLink={`${host}${pathname}`}
        postTitle="Check out this awesome post on Block Face!"
      />
    </Sidebar>
  );
}
