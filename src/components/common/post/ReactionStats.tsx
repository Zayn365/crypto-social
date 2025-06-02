import {
  ChartNoAxesColumn,
  Gem,
  MessageCircle,
  Quote,
  Repeat2,
  Smile,
  Upload,
} from "lucide-react";
import moment from "moment";
import React from "react";

export default function ReactionStats({ post }: any) {
  const list = [
    {
      no: 29,
      name: "Reactions",
    },
    {
      no: 9,
      name: " Reposts",
    },
    {
      no: 2,
      name: " Quotes",
    },
    {
      no: 3,
      name: "Diamonds ($0.03)",
    },
  ];

  const actionList = [
    {
      icon: (
        <MessageCircle
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Smile
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Repeat2
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Quote
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Gem
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Upload
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999]">
          Posted on <span className="underline">Block</span> •{" "}
          {moment(post?.createdAt).format("MMM/DD/YY [@] hh:mma")}
        </div>
        <div>
          {" "}
          <span
            className={`flex gap-2 items-center text-xs dark:hover:text-[#DDE5EE] hover:text-[#000000] dark:text-[#8C9FB7A0] text-[#999999]`}
          >
            <ChartNoAxesColumn size={16} /> {post?.interactions?.views}
          </span>
        </div>
      </div>

      <div className="border-y p-3 flex items-center justify-around">
        {list.map((item, idx) => (
          <div
            key={idx}
            className={`text-sm dark:hover:text-[#DDE5EE] hover:text-[#000000] dark:text-[#8C9FB7A0] text-[#999999] font-medium cursor-pointer`}
          >
            {item?.no} {item?.name}
          </div>
        ))}
      </div>

      <div className="p-3 flex items-center justify-around border-b">
        {actionList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-full p-2 whitespace-nowrap dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] border cursor-pointer"
          >
            {item?.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
