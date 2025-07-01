"use client";
import { defaultUserProfile, sliceMethod } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import FollowBtn from "../FollowBtn";
import { AnimatePresence, motion } from "framer-motion";
import WalletCard from "./WalletCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotsLoader from "../DotsLoader";
import MainLoader from "../MainLoader";

export default function LeaderboardPage() {
  const { allUsers } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      const validUsers = allUsers.filter(
        (user: any) => user?.assets !== undefined
      );
      setIsLoading(validUsers.length === 0);
    } else {
      setIsLoading(true);
    }
  }, [allUsers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <MainLoader />
      </div>
    );
  }

  const sortedUsers = [...allUsers]
    .filter((user: any) => user?.assets !== undefined)
    .sort((a: any, b: any) => {
      const balanceA = Number(a?.assets?.totalBalanceUSD || 0);
      const balanceB = Number(b?.assets?.totalBalanceUSD || 0);
      return balanceB - balanceA;
    });

  return (
    <div className="w-full px-4 py-4">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <div className="max-h-[50vh] overflow-y-auto border-b p-4 max-sm:p-1 hide-scrollbar">
        <AnimatePresence>
          {sortedUsers.map((item: any, idx: number) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 justify-between mt-4 max-sm:flex-col max-sm:border-b"
              key={item.wallet_address || idx}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`text-2xl max-sm:text-xs max-md:text-base font-black w-[45px] max-sm:w-6 ${
                      idx + 1 === 1
                        ? "text-[#E0DA20]"
                        : "text-[#000000] dark:text-[#FFFFFF]"
                    } `}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <Avatar className="size-8">
                      <AvatarImage
                        width={100}
                        height={100}
                        className="w-8 h-8 object-cover"
                        src={item?.avatar || defaultUserProfile}
                      />
                      <AvatarFallback>
                        <DotsLoader size="w-1 h-1" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[#000000] dark:text-[#FFFFFF] text-xl max-sm:text-xs max-md:text-base font-bold truncate w-[100px] max-sm:w-[50px]">
                      {item?.name}
                    </div>
                    <span className="text-xs dark:text-[#8c9fb7a0] text-[#999999]">
                      {sliceMethod(item?.wallet_address)}
                    </span>
                  </div>
                </div>
                <FollowBtn
                  handleSubmit={() => {
                    console.log("first");
                  }}
                  className="max-sm:px-2"
                />
              </div>
              {item?.assets?.totalBalanceUSD !== undefined &&
              typeof item?.assets?.totalBalanceUSD === "number" ? (
                <div className="text-[#44FF00] text-xl max-sm:text-xs max-md:text-base font-black max-sm:self-end">
                  ${item?.assets?.totalBalanceUSD?.toFixed(3)}
                </div>
              ) : (
                <MainLoader />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <h1 className="text-3xl font-bold text-center mt-6">Top Wallets</h1>
      <div className="max-w-[1020px] lg:max-w-[750px] xl:max-w-[980px] mt-4 mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          slidesPerView={"auto"}
          loop={true}
          style={{ width: "100%" }}
        >
          {sortedUsers.map((item, idx) => (
            <SwiperSlide key={idx} style={{ width: "auto" }}>
              <div className="p-4 w-fit">
                <WalletCard item={item} idx={idx} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
