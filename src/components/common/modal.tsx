import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Dialog, DialogOverlay, DialogPortal } from "../ui/dialog";

interface ModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal = ({ open, onClose, className, children }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay className="backdrop-blur-[10px] bg-[#01010108]" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200",
            "border border-tertiary-300 rounded-[17px] px-8 bg-neutral-200",
            className
          )}
        >
          {children}
          <DialogPrimitive.Close className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer">
            <XIcon className="cursor-pointer" />
            <span className="sr-only cursor-pointer">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
