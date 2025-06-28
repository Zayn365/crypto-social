import React from "react";

export default function SpinLoader({ text }: { text?: string }) {
  return (
    <div className="flex justify-center items-center p-0">
      <div className="w-10 h-10 border-4 border-[#1A4FBA] border-t-[0px] rounded-full animate-spin"></div>
      <span className="ml-3 text-[#1A4FBA]">{text}</span>
    </div>
  );
}
