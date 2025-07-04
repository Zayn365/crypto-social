"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

export default function MainLoader({ text }: { text?: string }) {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col justify-center items-center p-0">
      <Image
        alt=""
        src={theme === "light" ? "/loading-dark.gif" : "/loading.gif"}
        width={100}
        height={100}
      />
      <span className="">
        {text ? text : <div className="flex gap-1 text-sm">BLOCKIFYING</div>}
      </span>
    </div>
  );
}
