"use client";
import { sliceMethod } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";

export default function LeaderboardPage() {
  const { allUsersAssets } = useAuth();
  return (
    <div className="w-full px-4 py-2">
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      {allUsersAssets.map((item: any, idx: number) => (
        <div className="flex justify-between mt-4" key={idx}>
          <div className="flex items-center gap-2">
            <div>
              <h2 className="flex items-center gap-2">
                {sliceMethod(item?.walletAddress)}{" "}
              </h2>
            </div>
          </div>
          <div>
            <h1 className="text-xs text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00] font-bold">
              ${Number(item?.totalBalanceUSD).toFixed(3)}
            </h1>
            <div className="text-xs text-end dark:text-[#8c9fb7a0] text-[#999999]">
              Assets
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
