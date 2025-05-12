import React from "react";
import BuyTokenBtn from "../buy-token-btn";
import { SimpleDropdownMenu } from "../SimpleDropdown";
import ProjectInfoCard from "./ProjectInfoCard";
import { projectInfoData } from "@/components/dummuyData/projectInfoData";

export default function DiscoverHeader() {
  return (
    <div>
      <div className="border-b flex items-center gap-4 justify-start p-4">
        <BuyTokenBtn clasName="h-11">Top Active Users</BuyTokenBtn>
        <BuyTokenBtn clasName="h-11">Top New Users</BuyTokenBtn>
        <BuyTokenBtn clasName="h-11">Top Earning Users</BuyTokenBtn>
      </div>
      <div className="border-b flex flex-col p-4">
        <div className="font-semibold text-base dark:text-[#DDE5EE]">
          Custom Filter
        </div>
        <div className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
          Showing results with custom filters applied.
        </div>
      </div>
      <div className="border-b flex items-center gap-4 justify-start p-4">
        <SimpleDropdownMenu
          btnTitle="Filter"
          btnClassName="text-[#999999] dark:text-[#8c9fb7a0] border-none bg-none"
          triggerClassName=""
          contentClassName="text-[#999999] dark:text-[#8c9fb7a0]"
          label="Filter"
          labelClassName="font-bold"
          separatorClassName="bg-gray-600"
          groupClassName="p-1"
          shortcutClassName="text-gray-400"
          items={[
            {
              group: [
                {
                  name: "Profile",
                  className: "",
                },
                {
                  name: "Reaction",
                  className: "",
                },
              ],
            },
          ]}
        />
        <SimpleDropdownMenu
          btnTitle="Sort"
          btnClassName="text-[#999999] dark:text-[#8c9fb7a0] border-none bg-none"
          triggerClassName=""
          contentClassName="text-[#999999] dark:text-[#8c9fb7a0]"
          label="Sort"
          labelClassName="font-bold"
          separatorClassName="bg-gray-600"
          groupClassName="p-1"
          shortcutClassName="text-gray-400"
          items={[
            {
              group: [
                {
                  name: "Profile",
                  className: "",
                },
                {
                  name: "Reaction",
                  className: "",
                },
              ],
            },
          ]}
        />
      </div>
      <div className="p-4 flex flex-col gap-4">
        {projectInfoData.map((item, idx) => (
          <ProjectInfoCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}
