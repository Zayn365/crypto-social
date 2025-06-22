import React, { useState } from "react";
import ToolTip from "../tool-tip";
import {
  Edit,
  Ellipsis,
  ListTodo,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
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
import CreatePostModal from "../CreatePostModal";

export default function PostHeader({ post }: any) {
  const { user, totalAssetsValues } = useAuth();
  const url = usePathname();
  const { id } = useParams();
  const deletePost = usePostDelete();
  const router = useRouter();

  const [postModal, setPostModal] = useState<boolean>(false);

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
    <div className="flex justify-between items-center gap-4 flex-wrap">
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
          <div
            className="hover:underline dark:text-[#DDE5EE] font-semibold flex items-center gap-2 cursor-pointer"
            onClick={() => router.replace(`/${post?.userInfo?.id}`)}
          >
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
            {/* <div className="text-base text-shadow-[#17a34a] dark:text-[#00ff00] text-[#00ff00] font-medium">
              ${totalAssetsValues}
            </div> */}
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
      <div className="flex items-center gap-2 justify-between">
        <div
          className={`dark:bg-[#FFFFFF] dark:text-black bg-black text-white px-4 py-2 rounded-full font-medium text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] cursor-pointer`}
        >
          Follow
        </div>
        {/* <ListTodo
          className={`text-xs dark:hover:text-[#59B4FF] hover:text-[#59B4FF] dark:text-[#8C9FB7A0] text-[#999999] cursor-pointer`}
          size={20}
        />
        <div
          className={`font-medium text-xs text-[#59B4FF] hover:underline cursor-pointer`}
        >
          Subscribe
        </div> */}
        {String(post?.userInfo?.id) === String(user?.id) && (
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
                {/* <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setPostModal(true)}
                >
                  <Edit className="" /> Edit
                </DropdownMenuItem> */}
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

        {/* {url.includes("post") && (
          <div className="flex flex-col justify-center items-center gap-1">
            <ThumbsUp className="text-[#8c9fb7a0] cursor-pointer" size={16} />
            <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-sm">
              {post?.userInfo?.postValue ?? 0}
            </div>
            <ThumbsDown className="text-[#8c9fb7a0] cursor-pointer" size={16} />
          </div>
        )} */}
      </div>
      <CreatePostModal
        open={postModal}
        onClose={() => setPostModal(false)}
        post={post}
      />
    </div>
  );
}
