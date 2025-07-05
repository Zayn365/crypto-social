"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function MainLoader({ text }: { text?: string }) {
  const { theme } = useTheme();
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-0">
      <Image
        alt=""
        src={theme === "light" ? "/loading-dark.gif" : "/loading.gif"}
        width={100}
        height={100}
      />
      <span className="">
        {text ? (
          text
        ) : (
          <div className="flex gap-1 text-sm">
            Decentraloading{".".repeat(dotCount)}
          </div>
        )}
      </span>
    </div>
  );
}
