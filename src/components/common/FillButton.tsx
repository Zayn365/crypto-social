import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type FillButtonType = React.ComponentProps<typeof Button> & {
  handleClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function FillButton({
  handleClick,
  children,
  className,
  ...props
}: FillButtonType) {
  return (
    <Button
      onClick={handleClick}
      className={cn(
        "bg-[#32bd91] dark:bg-[#32bd91] hover:bg-transparent hover:border hover:border-[#32bd91] hover:text-[#32bd91] dark:hover:bg-[#15293A] dark:hover:border-[#32bd91] dark:hover:text-[#32bd91] text-sm whitespace-nowrap px-4 py-2 rounded-full cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
