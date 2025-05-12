import React from "react";
import { Button } from "../ui/button";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BuyTokenBtn({
  children,
  clasName,
  onClick,
}: {
  children: ReactNode;
  clasName?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      className={cn(
        "justify-center whitespace-nowrap rounded-full font-sans! text-sm font-medium transition-colors border dark:border-[#2a323b7e] bg-transparent dark:text-[#a3adb9] hover:bg-[#F1F1F1] text-[#000] dark:hover:bg-[#13151a] dark:hover:text-white h-9 px-3 flex items-center gap-2 min-w-[180px] cursor-pointer",
        clasName
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
