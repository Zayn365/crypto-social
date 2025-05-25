import React from "react";
import { Modal } from "./modal";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookText, Globe, SquareArrowOutUpRight } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ open, onClose }: ModalProps) {
  const { user } = useAuth();
  return (
    <Modal open={open} onClose={onClose} className="dark:bg-[#040609] w-full px-0">
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="font-bold dark:text-[#DDE5EE] text-xl">Add a post</div>
        <span className="w-full border-t border-border-light"></span>
        <div className="flex items-center justify-between w-full gap-4 px-4">
          <div className="flex items-center gap-4">
            <div>
              <Avatar className="size-10">
                <AvatarImage
                  width={100}
                  height={100}
                  className="rounded-full border object-cover"
                  src={user.avatar ?? "/userDefault.webp"}
                />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-sm flex items-center gap-2">
                {user?.name}
                <h2 className="text-xs dark:text-[#A3ADB9]">
                  @{user?.username}
                </h2>
              </h1>
              <h2 className="text-xs dark:text-[#A3ADB9] hover:text-[#32bd91] dark:hover:text-[#32bd91] cursor-pointer flex items-center gap-1">
                <Globe size={14} /> Posting to everyone
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BookText
              className="hover:text-[#32bd91] dark:hover:text-[#32bd91] cursor-pointer"
              size={18}
            />
            <SquareArrowOutUpRight
              className="hover:text-[#32bd91] dark:hover:text-[#32bd91] cursor-pointer"
              size={18}
            />
          </div>
        </div>
        <span className="w-full border-t border-border-light"></span>
      </div>
    </Modal>
  );
}
