"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

interface DropdownMenuCheckboxesProps {
  btnTitle?: string | React.ReactNode;
  btnTitleClassName?: string;
  items?: { name: string; disabled?: boolean }[];
  contentClassName?: string;
  checkboxItemClassName?: string;
}

export function DropdownMenuCheckboxes({
  btnTitle,
  btnTitleClassName,
  contentClassName,
  checkboxItemClassName,
  items,
}: DropdownMenuCheckboxesProps) {
  const [selectedItem, setSelectedItem] = React.useState<string>(
    items?.[0]?.name || ""
  );

  const handleSelect = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex gap-1 items-center px-4 text-sm dark:hover:text-[#59B4FF] hover:text-[#59B4FF] cursor-pointer",
            btnTitleClassName
          )}
        >
          {btnTitle} {selectedItem} <ChevronsUpDown size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-[260px] dark:bg-[#040609]", contentClassName)}
      >
        {items?.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.name}
            className={cn(
              "dark:hover:text-[#59B4FF] hover:text-[#59B4FF] cursor-pointer",
              checkboxItemClassName
            )}
            checked={selectedItem === item.name}
            onCheckedChange={() => handleSelect(item.name)}
            disabled={item.disabled}
            onSelect={(e) => e.preventDefault()} // Prevent menu from closing
          >
            {item.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
