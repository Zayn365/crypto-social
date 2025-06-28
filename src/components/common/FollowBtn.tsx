import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FollowBtnProps {
  handleSubmit?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  Props?: any;
}

export default function FollowBtn({
  handleSubmit,
  className,
  Props,
}: FollowBtnProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 p-[1px] w-fit rounded-full">
      <Button
        type="button"
        onClick={handleSubmit}
        className={cn(
          `dark:bg-[#FFFFFF] dark:text-black bg-black text-white px-4 py-2 rounded-full font-medium text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] cursor-pointer`,
          "",
          className
        )}
        {...Props}
      >
        Follow
      </Button>
    </div>
  );
}
