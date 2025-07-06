import { sliceMethod } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import moment from "moment";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function WalletBalanceCard({ data }: any) {
  const { theme } = useTheme();

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Cpoied Successfully`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div className="flex flex-col gap-4  border p-4 rounded-lg">
      <div className="flex items-center gap-4 justify-between">
        <div>
          <div className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
            Spendable Balance
          </div>
          <div className="text-lg text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00]">
            ~$
            {data?.assets?.totalBalanceUSD
              ? Number(data?.assets?.totalBalanceUSD).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 0}{" "}
            USD
          </div>
        </div>
        <div>
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
        </div>
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer w-fit"
        onClick={() => handleCopy(data?.wallet_address)}
      >
        <CopyIcon size={16} />{" "}
        {data?.wallet_address && sliceMethod(data?.wallet_address)}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
            Account
          </div>
          <div className="text-sm dark:text-[#FFFFFF] text-[#000]">
            {data?.name}{" "}
            <span className="text-[#999999] dark:text-[#8c9fb7a0]">
              @{data?.username}
            </span>
          </div>
        </div>
        <div>
          <div className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
            Joined
          </div>
          <div className="text-sm dark:text-[#FFFFFF] text-[#000]">
            {data?.created_date_time &&
              moment(data?.created_date_time).format("MMM/DD")}
          </div>
        </div>
      </div>
    </div>
  );
}
