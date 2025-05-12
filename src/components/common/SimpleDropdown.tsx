"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DropdownMenuItemProps {
  name: string;
  shortcut?: string;
  disabled?: boolean;
  className?: string;
}

interface DropdownMenuSubItemProps {
  name: string;
  disabled?: boolean;
  className?: string;
}

interface DropdownMenuSubMenuProps {
  trigger: string;
  items: DropdownMenuSubItemProps[];
  triggerClassName?: string;
  contentClassName?: string;
  separatorClassName?: string;
}

interface DropdownMenuSectionProps {
  group?: DropdownMenuItemProps[];
  subMenu?: DropdownMenuSubMenuProps;
  single?: DropdownMenuItemProps[];
}

interface DropdownMenuProps {
  btnTitle?: string | React.ReactNode;
  btnVariant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  btnClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  label?: string;
  labelClassName?: string;
  groupClassName?: string;
  separatorClassName?: string;
  shortcutClassName?: string;
  items?: DropdownMenuSectionProps[];
}

export function SimpleDropdownMenu({
  btnTitle = "Open",
  btnVariant = "outline",
  btnClassName,
  triggerClassName,
  contentClassName,
  label = "My Account",
  labelClassName,
  groupClassName,
  separatorClassName,
  shortcutClassName,
  items = [],
}: DropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn(triggerClassName)}>
        <Button variant={btnVariant} className={cn(btnClassName)}>
          {btnTitle}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn("w-56", contentClassName)}>
        <DropdownMenuLabel className={cn(labelClassName)}>
          {label}
        </DropdownMenuLabel>
        {items.map((section, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <DropdownMenuSeparator className={cn(separatorClassName)} />
            )}
            {section.group && (
              <DropdownMenuGroup className={cn(groupClassName)}>
                {section.group.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    disabled={item.disabled}
                    className={cn(item.className)}
                  >
                    {item.name}
                    {item.shortcut && (
                      <DropdownMenuShortcut className={cn(shortcutClassName)}>
                        {item.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
                {section.subMenu && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={cn(section.subMenu.triggerClassName)}
                    >
                      {section.subMenu.trigger}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent
                        className={cn(section.subMenu.contentClassName)}
                      >
                        {section.subMenu.items.map((subItem) => (
                          <DropdownMenuItem
                            key={subItem.name}
                            disabled={subItem.disabled}
                            className={cn(subItem.className)}
                          >
                            {subItem.name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator
                          className={cn(section.subMenu.separatorClassName)}
                        />
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
              </DropdownMenuGroup>
            )}
            {section.single &&
              section.single.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  disabled={item.disabled}
                  className={cn(item.className)}
                >
                  {item.name}
                  {item.shortcut && (
                    <DropdownMenuShortcut className={cn(shortcutClassName)}>
                      {item.shortcut}
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
