import Image from "next/image";
import React from "react";

export default function CoreAssets() {
  const tokenData = [
    {
      name: "DeSo",
      symbol: "$DESO",
      image: "/coinImg/coin-deso.webp",
      balance: "0.00005",
      usdValue: "~$0.01 USD",
    },
    {
      name: "USDC-DESO",
      symbol: "$USDC",
      image: "/coinImg/coin-usdc.webp",
      balance: "0.00005",
      usdValue: "~$0.01 USD",
    },
    {
      name: "DeSo",
      symbol: "$DESO",
      image: "/coinImg/coin-deso.webp",
      balance: "0.00005",
      usdValue: "~$0.01 USD",
    },
  ];
  return (
    <div>
      <div className="text-[#999999] dark:text-[#8c9fb7a0] text-base">
        Core Assets
      </div>
      <div className="flex flex-col border rounded-lg">
        {tokenData.map((item, idx) => (
          <div className="border-b" key={idx}>
            <div className="flex items-center justify-between gap-4 p-2">
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  src={item?.image}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <div className="dark:text-[#a3adb9] text-[#000] text-sm">
                    {item?.name}
                  </div>
                  <div className="text-[#999999] dark:text-[#8c9fb7a0] text-xs">
                    {item?.symbol}
                  </div>
                </div>
              </div>
              <div>
                <div className="dark:text-[#a3adb9] text-[#000] text-sm">
                  {item?.balance} {item?.symbol}
                </div>
                <div className="text-[#999999] dark:text-[#8c9fb7a0] flex text-xs justify-end">
                  {item?.usdValue}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between p-2 gap-2">
          <div className="text-[#999999] dark:text-[#8c9fb7a0] text-sm">
            Total Spendable Balance
          </div>
          <div className="text-sm text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00]">
            ~0.01 USd
          </div>
        </div>
      </div>
    </div>
  );
}
