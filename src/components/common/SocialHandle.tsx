import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SocialHandle() {
  const { theme } = useTheme();
  const socialData = [
    {
      img: "/telegram.png",
      link: "#",
    },
    {
      img: theme === "dark" ? "/github-white.png" : "/github.png",
      link: "#",
    },
    {
      img: theme === "dark" ? "/gitbook-white.png" : "/gitbook.svg",
      link: "#",
    },
    {
      img: theme === "dark" ? "/twitter-white.png" : "/twitter.png",
      link: "#",
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {socialData.map((item, idx) => (
        <Link href={item?.link} target="_blank" key={idx}>
          <Image
            src={item?.img}
            alt={item?.img}
            width={20}
            height={20}
            className="min-w-[20px] max-w-[20px] max-h-[20px] min-h-[20px]"
          />
        </Link>
      ))}
    </div>
  );
}
