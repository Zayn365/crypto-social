import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface ToolTipProps {
  children: React.ReactNode;
  content: any;
  contentClassName?: string;
  triggerClassName?: string;
}

export default function ToolTip({
  children,
  content,
  contentClassName,
  triggerClassName,
}: ToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn("", triggerClassName)}>
          {children}
        </TooltipTrigger>
        <TooltipContent className={cn("", contentClassName)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
