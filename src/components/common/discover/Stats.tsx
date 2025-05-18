import React from "react";

export default function Stats({ data }: any) {
  return (
    <div className="grid grid-cols-4 mt-4 border rounded-lg">
      {data.stats.map((stat: any, index: any) => (
        <div
          key={index}
          className={`p-3 dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] cursor-pointer ${
            index > 0 ? "border-l" : ""
          }`}
        >
          <p className="dark:text-[#8c9fb7a0] text-[#999999] text-sm max-md:text-xs">
            {stat.label}
          </p>
          <p className="dark:text-[#DDE5EE] text-[#000000] font-semibold flex items-center gap-2 max-md:text-xs">
            {stat.value}
            {stat.whaleCount && (
              <span className="dark:text-[#8c9fb7a0] text-[#999999] text-sm flex items-center justify-center gap-2">
                {stat.whaleCount}
                <img
                  alt="whale"
                  loading="lazy"
                  width="20"
                  height="20"
                  className="inline-flex translate-y-[-10%]"
                  src={stat.whaleImage}
                />
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
