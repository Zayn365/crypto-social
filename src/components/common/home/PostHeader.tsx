import React from "react";
import ToolTip from "../tool-tip";
import { Ellipsis, ListTodo, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import { usePostDelete } from "@/lib/utils";
import toast from "react-hot-toast";

export default function PostHeader({ post }: any) {
  const { user } = useAuth();
  const url = usePathname();
  const { id } = useParams();
  const deletePost = usePostDelete();

  const handleDeletePost = () => {
    try {
      if (user.id) {
        deletePost.mutate({
          id: post?.id,
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login");
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 max-md:flex-col max-md:items-start">
      <div className="flex items-center gap-2">
        {url.includes("post") && (
          <Avatar className="size-14">
            <AvatarImage
              width={100}
              height={100}
              className="w-14 h-14 object-cover"
              src={post?.userInfo?.avatar ?? "/userDefault.webp"}
            />
            <AvatarFallback>{post?.userInfo?.name ?? "img"}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col gap-1">
          <div className="hover:underline dark:text-[#DDE5EE] font-semibold flex items-center gap-2">
            {post?.userInfo?.username}{" "}
            {post?.userInfo?.verifiedIcon && (
              <img
                alt="Verified Token"
                data-state="closed"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                data-nimg="1"
                className="max-h-max"
                src="/verified.gif"
              />
            )}
            {post?.user?.whaleIcon && (
              <img
                alt="whale"
                data-state="closed"
                loading="lazy"
                width="24"
                height="24"
                decoding="async"
                data-nimg="1"
                className="inline-flex translate-y-[-10%]"
                src="/cropped-whale-small.webp"
              />
            )}
          </div>
          <div className="text-sm dark:text-[#8C9FB7A0] text-[#999999]">
            @{post?.userInfo?.username} .{" "}
            <ToolTip content={moment(post?.createdAt).format("MMM-DD-YYYY")}>
              {" "}
              {moment(post?.createdAt).fromNow()}
            </ToolTip>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 max-md:justify-around max-md:w-full">
        <ListTodo
          className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999] cursor-pointer`}
          size={20}
        />
        <div
          className={`font-medium text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999] cursor-pointer`}
        >
          Follow
        </div>
        <div
          className={`font-medium text-xs text-[#59B4FF] hover:underline cursor-pointer`}
        >
          Subscribe
        </div>
        {String(post?.userInfo?.id) === String(id) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="hover:bg-[#F1F1F1] dark:hover:bg-[#13151A] rounded-full p-2 cursor-pointer">
                <Ellipsis
                  className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999]`}
                  size={16}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="text-red-700 hover:text-red-700 cursor-pointer"
                  onClick={handleDeletePost}
                >
                  <Trash2 className="text-red-700" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {url.includes("post") && (
          <div className="flex flex-col justify-center items-center gap-1">
            <ThumbsUp className="text-[#8c9fb7a0] cursor-pointer" size={16} />
            <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-sm">
              {post?.userInfo?.postValue ?? 0}
            </div>
            <ThumbsDown className="text-[#8c9fb7a0] cursor-pointer" size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
