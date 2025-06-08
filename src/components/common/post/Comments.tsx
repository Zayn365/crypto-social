import React from "react";
import { DropdownMenuCheckboxes } from "../DropdownMenuCheckboxes";
import {
  ChartNoAxesColumn,
  Ellipsis,
  Gem,
  MessagesSquare,
  Repeat2,
  Smile,
  ThumbsDown,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTotalComments } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentDelete } from "@/services/posts";

export default function Comments({ post }: any) {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const commentsData =
    post?.postInfo
      ?.filter((item: any) => item?.comment?.trim() !== "")
      ?.map((item: any) => {
        const user = item.userId || item.userInfo || {};
        return {
          id: item?.userId?.id,
          username: user?.username || user?.name || "Unknown",
          handle: user?.wallet_address
            ? `${user.wallet_address.slice(0, 6)}...${user.wallet_address.slice(
                -4
              )}`
            : "",
          // time: "Just now", // You can replace this with actual timestamps if available
          content: item.comment,
          avatarSrc: user.avatar || "/userDefault.webp",
          likes: item.like === true ? 1 : item.like || 0,
          replies: 0, // Add real replies if you have them
          shares: item.emoji ? 1 : 0, // Just for example
          diamonds: 0,
          views: 0,
          follow: "",
          subComments: [], // Add nested comments if available
        };
      }) || [];

  const deleteComment = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Comment deleted`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleDeleteComment = (commentId: string) => {
    try {
      if (user.id) {
        deleteComment.mutate({
          id: post?.id,
          userId: user.id,
          commentId,
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
    <div>
      <div className="flex justify-between items-center p-3 border-b">
        <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999]">
          Comments ({getTotalComments(post?.postInfo)})
        </div>
        <div>
          <DropdownMenuCheckboxes
            btnTitle={"Sort:"}
            btnTitleClassName="bg-transparent dark:text-[#A3ADB9] justify-start text-xs"
            contentClassName="w-fit"
            items={[
              { name: `Most Valuable` },
              { name: `Latest` },
              { name: `Most Diamonds` },
            ]}
          />
        </div>
      </div>

      {/* Comments Section */}
      <div className="divide-y divide-[#2a323b7e]">
        {commentsData.map((comment: any, index: number) => (
          <div key={index} className="p-3">
            {/* Comment Header */}
            <div className="flex items-start space-x-3">
              <div className="flex flex-col gap-2">
                <div className="w-fit h-fit">
                  <Avatar className="size-9">
                    <AvatarImage
                      width={100}
                      height={100}
                      className="w-9 h-9 object-cover"
                      src={comment?.avatarSrc ?? "/userDefault.webp"}
                    />
                    <AvatarFallback>{comment.username}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <ThumbsUp
                    className="text-[#8c9fb7a0] cursor-pointer"
                    size={14}
                  />
                  <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-xs">
                    {comment.follow}
                  </div>
                  <ThumbsDown
                    className="text-[#8c9fb7a0] cursor-pointer"
                    size={14}
                  />
                </div>
              </div>
              {/* Placeholder for avatar */}
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold dark:text-[#DDE5EE]">
                      {comment.username}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        {comment.handle}
                      </span>
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        ·
                      </span>
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        {comment.time}
                      </span>
                    </div>
                  </div>
                  {String(user?.id) === String(comment?.userInfo?.id) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="ml-auto text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer">
                          <Ellipsis size={14} />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="text-red-700 hover:text-red-700 cursor-pointer"
                            onClick={() => handleDeleteComment(comment?.id)}
                          >
                            <Trash2 className="text-red-700" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {/* More options */}
                </div>
                {/* Comment Content */}
                <p className="text-sm mt-1">{comment.content}</p>
                {/* Interaction Icons */}
                <div className="flex items-center space-x-4 mt-2 text-[#999999] dark:text-[#8c9fb7a0] max-md:flex-wrap">
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <ThumbsUp size={14} />
                    <span className="text-xs">{comment.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <MessagesSquare size={14} />
                    <span className="text-xs">Reply</span>
                    <span className="text-xs">{comment.replies}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <Smile size={14} />
                    <span className="text-xs">{comment.shares}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <Repeat2 size={14} />
                  </div>
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <Gem size={14} />
                    <span className="text-xs">{comment.diamonds}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <ChartNoAxesColumn size={14} />
                    <span className="text-xs">{comment?.views}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Comments (Replies) */}
            {comment.subComments && (
              <div className="ml-12 mt-3 divide-y divide-gray-800">
                {comment.subComments.map(
                  (subComment: any, subIndex: number) => (
                    <div key={subIndex} className="pt-3">
                      <div className="flex items-start space-x-3">
                        <div className="flex flex-col gap-2">
                          <div className="w-fit h-fit">
                            <Avatar className="size-9">
                              <AvatarImage
                                width={100}
                                height={100}
                                className="w-9 h-9 object-cover"
                                src={
                                  subComment?.avatarSrc ?? "/userDefault.webp"
                                }
                              />
                              <AvatarFallback>
                                {subComment.username}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col justify-center items-center gap-1">
                            <ThumbsUp
                              className="text-[#8c9fb7a0] cursor-pointer"
                              size={14}
                            />
                            <div className="text-[#2f2f2f] dark:text-[#a3adb9] text-xs">
                              {subComment.follow}
                            </div>
                            <ThumbsDown
                              className="text-[#8c9fb7a0] cursor-pointer"
                              size={14}
                            />
                          </div>
                        </div>
                        {/* Placeholder for avatar */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-1">
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold dark:text-[#DDE5EE]">
                                {subComment.username}
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  {subComment.handle}
                                </span>
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  ·
                                </span>
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  {subComment.time}
                                </span>
                              </div>
                            </div>
                            <span className="ml-auto text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer">
                              <Ellipsis size={14} />
                            </span>{" "}
                            {/* More options */}
                          </div>
                          <p className="text-sm mt-1">{subComment.content}</p>
                          <div className="flex items-center space-x-4 mt-2 text-[#999999] dark:text-[#8c9fb7a0] max-md:flex-wrap">
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <ThumbsUp size={14} />
                              <span className="text-xs">{comment.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <MessagesSquare size={14} />
                              <span className="text-xs">Reply</span>
                              <span className="text-xs">{comment.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <Smile size={14} />
                              <span className="text-xs">{comment.shares}</span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <Repeat2 size={14} />
                            </div>
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <Gem size={14} />
                              <span className="text-xs">
                                {comment.diamonds}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <ChartNoAxesColumn size={14} />
                              <span className="text-xs">{comment?.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
