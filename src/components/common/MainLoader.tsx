import Image from "next/image";
import React from "react";

export default function MainLoader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center p-0">
      <Image alt="" src={"/loading.gif"} width={100} height={100} />
      <span className="text-[#1A4FBA]">{text}</span>
    </div>
  );
}
