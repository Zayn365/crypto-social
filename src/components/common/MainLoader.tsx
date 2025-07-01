import Image from "next/image";
import React from "react";

export default function MainLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center p-0">
      <Image alt="" src={"/loading.gif"} width={400} height={400} />
      <span className="text-[#1A4FBA]">{text}</span>
    </div>
  );
}
