import { User } from "lucide-react";
import React from "react";
import ToolTip from "./tool-tip";

export default function UserAssetsData() {
  const userData = [
    {
      img: <User />,
      tag: true,
      verified: true,
      name: "owilde",
      userName: "@owilde",
      amount: "$66,285.44",
    },
    {
      img: <User />,
      tag: true,
      verified: true,
      name: "jdoe",
      userName: "@jdoe",
      amount: "$45,123.88",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "asmith",
      userName: "@asmith",
      amount: "$98,765.00",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "mcurie",
      userName: "@mcurie",
      amount: "$12,345.67",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "aeinstein",
      userName: "@aeinstein",
      amount: "$73,100.20",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "nbohr",
      userName: "@nbohr",
      amount: "$50,000.00",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "turing",
      userName: "@turing",
      amount: "$42,000.00",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "ada",
      userName: "@ada",
      amount: "$29,500.00",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "graceh",
      userName: "@graceh",
      amount: "$60,000.00",
    },
    {
      img: <User />,
      tag: false,
      verified: false,
      name: "lovelace",
      userName: "@lovelace",
      amount: "$88,888.88",
    },
  ];
  return (
    <div className="mt-4 px-4 max-h-[30vh] overflow-y-auto slim-scrollbar">
      {userData.map((user, index) => (
        <div
          key={index}
          className="flex justify-between gap-4 items-center mb-4"
        >
          <div className="flex items-center gap-2">
            <div>{user?.img}</div>
            <div className="flex flex-col">
              <div className="text-xs dark:text-[#DDE5EE] font-bold flex items-center gap-2">
                <ToolTip
                  content="The Block Tokens that have the highest trading volume recently."
                  contentClassName="dark:text-[#A3ADB9] dark:bg-[#13151A]"
                  triggerClassName="flex items-center gap-2"
                >
                  {user.name}
                  {user?.verified && (
                    <img
                      alt="Verified Token"
                      data-state="closed"
                      loading="lazy"
                      width="16"
                      height="16"
                      decoding="async"
                      data-nimg="1"
                      className="max-h-max"
                      src="/verified.gif"
                    />
                  )}
                  {user?.tag && (
                    <img
                      alt="whale"
                      data-state="closed"
                      loading="lazy"
                      width="16"
                      height="16"
                      decoding="async"
                      data-nimg="1"
                      className="inline-flex translate-y-[-10%]"
                      src="/cropped-whale-small.webp"
                    />
                  )}
                </ToolTip>
              </div>
              <div className="text-xs dark:text-[#8c9fb7a0] text-[#999999]">
                {user.userName}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00] font-bold">
              {user.amount}
            </div>
            <div className="text-xs dark:text-[#8c9fb7a0] text-[#999999]">
              Assets
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
