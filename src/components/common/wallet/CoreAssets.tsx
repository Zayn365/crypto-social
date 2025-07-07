import Image from "next/image";
import React from "react";

export default function CoreAssets({ data }: any) {
  const tokenData = [
    {
      token: "Block",
      symbol: "block",
      logo: "/main-logo.png",
      balance: "0.00",
      valueUSD: "0.0 USD",
    },
    {
      token: "USDC",
      symbol: "USDC",
      logo: "/coinImg/coin-usdc.webp",
      balance: "0.00",
      valueUSD: "0.0 USD",
    },
  ];
  const coinData = data?.assets?.coins || [];
  const allData = [...tokenData, ...coinData];

  const totalBalanceUSD = data?.assets?.totalBalanceUSD || 0;

  return (
    <div>
      <div className="text-[#999999] dark:text-[#8c9fb7a0] text-base">
        Assets
      </div>
      <div className="flex flex-col border rounded-lg">
        {allData?.map((item, idx) => (
          <div className="border-b" key={idx}>
            <div className="flex items-center justify-between gap-4 p-2">
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  src={item?.logo}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <div className="dark:text-[#a3adb9] text-[#000] text-sm">
                    {item?.token}
                  </div>
                  <div className="text-[#999999] dark:text-[#8c9fb7a0] text-xs">
                    ${item?.symbol}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="dark:text-[#a3adb9] text-[#000] text-sm text-end">
                  {item?.balance} {item?.symbol}
                </div>
                <div className="text-[#999999] dark:text-[#8c9fb7a0] flex text-xs justify-end">
                  ~${item?.valueUSD}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between p-2 gap-2">
          <div className="text-[#999999] dark:text-[#8c9fb7a0] text-sm">
            Total
          </div>
          <div className="text-sm text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00]">
            ~$
            {Number(totalBalanceUSD).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </div>
        </div>
      </div>
    </div>
  );
}
