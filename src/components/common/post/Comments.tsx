import React, { useState } from "react";
import { DropdownMenuCheckboxes } from "../DropdownMenuCheckboxes";
import {
  Ellipsis,
  MessageSquareMore,
  Repeat2,
  Smile,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  defaultUserProfile,
  emojis,
  getShortTime,
  getTotalMainComments,
  sliceMethod,
  useCommentLike,
  useCommentUnLike,
} from "@/lib/utils";
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
import {
  commentDelete,
  commentReply,
  commentReplyDelete,
  commentUpdate,
} from "@/services/posts";
import { AnimatePresence, motion } from "framer-motion";
import FillButton from "../FillButton";

export default function Comments({ post }: any) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  // const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [emojiPickerState, setEmojiPickerState] = useState<{
    [key: string]: boolean;
  }>({});

  const { mutate: likeComment } = useCommentLike();
  const { mutate: unlikeComment } = useCommentUnLike();

  const commentsData =
    post?.postInfo
      ?.filter((item: any) => item?.comments?.length > 0)
      ?.flatMap((item: any) => {
        const user = item?.userInfo || {};
        return item?.comments?.map((mainComment: any) => ({
          id: mainComment.id,
          username: user?.username || user?.name || "Unknown",
          handle: user?.wallet_address ? sliceMethod(user?.wallet_address) : "",
          time: getShortTime(mainComment?.createdAt) ?? "",
          content: mainComment?.comment,
          avatarSrc: user?.avatar || defaultUserProfile,
          likes: mainComment?.like ? 1 : 0,
          userLike:
            mainComment?.like && mainComment?.emoji ? mainComment?.emoji : null,
          replies: mainComment.reply?.length || 0, // No nested replies in provided data
          shares: 0,
          diamonds: 0,
          views: 0,
          follow: 0,
          userInfo: user, // Store userInfo for delete permission check
          subComments:
            mainComment.reply?.map((reply: any) => ({
              id: reply?.id,
              username:
                reply.userInfo?.username || reply.userInfo?.name || "Unknown",
              handle: reply.userInfo?.wallet_address
                ? sliceMethod(reply.userInfo?.wallet_address)
                : "",
              time: getShortTime(reply?.createdAt) ?? "",
              content: reply?.comment,
              avatarSrc: reply?.userInfo?.avatar || defaultUserProfile,
              likes: reply?.like ? 1 : 0, // No like data for replies
              userLike: reply?.like && reply?.emoji ? reply?.emoji : null,
              replies: 0, // No nested replies in data
              shares: 0,
              diamonds: 0,
              views: 0,
              follow: 0,
              userInfo: reply.userInfo,
            })) || [],
        }));
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

  const mainEditComment = useMutation({
    mutationFn: commentUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Comment updated`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const replyDeleteComment = useMutation({
    mutationFn: commentReplyDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Comment deleted`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const replyComment = useMutation({
    mutationFn: commentReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success(`Replied successful`);
      setCommentValue("");
      setShowCommentBox(false);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleLike = (emoji: string, commentId: string, replyId?: string) => {
    if (!user?.id) {
      toast.error("Please Login");
      return;
    }
    try {
      likeComment(
        {
          id: post?.id,
          like: true,
          userId: user.id,
          emoji: emoji,
          commentId: commentId,
          replyId: replyId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
            setEmojiPickerState((prev) => ({
              ...prev,
              [`${commentId}${replyId || ""}`]: false,
            }));
          },
          onError: () => toast.error("Failed to like comment"),
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Please Login");
    }
  };

  const handleUnlike = (commentId: string, replyId?: string) => {
    if (!user?.id) {
      toast.error("Please Login");
      return;
    }
    try {
      unlikeComment(
        {
          id: post?.id,
          like: false,
          userId: user.id,
          emoji: "",
          commentId: commentId,
          replyId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
            setEmojiPickerState((prev) => ({
              ...prev,
              [`${commentId}${replyId || ""}`]: false,
            }));
          },
          onError: () => toast.error("Failed to unlike comment"),
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Please Login");
    }
  };

  const handleEmojiClick = (
    emoji: string,
    commentId: string,
    replyId?: string
  ) => {
    const comment = replyId
      ? commentsData
          .find((c: any) => c.id === commentId)
          ?.subComments.find((sc: any) => sc.id === replyId)
      : commentsData.find((c: any) => c.id === commentId);
    const userLike = comment?.userLike;

    if (userLike === emoji) {
      handleUnlike(commentId, replyId);
    } else {
      handleLike(emoji, commentId, replyId);
    }
  };
  const toggleEmojiPicker = (commentId: string, replyId?: string) => {
    const key = `${commentId}${replyId || ""}`;
    setEmojiPickerState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMainEditComment = (commentId: string) => {
    try {
      if (user.id) {
        mainEditComment.mutate({
          id: post?.id,
          userId: user.id,
          comment: commentValue,
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

  const handleReplyComment = (commentId: string) => {
    try {
      if (user.id) {
        replyComment.mutate({
          id: post?.id,
          userId: user.id,
          comment: commentValue,
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

  const handleReplyDeleteComment = (replyId: string, commentId: string) => {
    try {
      if (user.id) {
        replyDeleteComment.mutate({
          id: post?.id,
          userId: user.id,
          replyId,
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
          Comments ({getTotalMainComments(post?.postInfo)})
        </div>
        <div>
          <DropdownMenuCheckboxes
            btnTitle={"Sort:"}
            btnTitleClassName="bg-transparent dark:text-[#A3ADB9] justify-start text-xs"
            contentClassName="w-fit"
            items={[{ name: `Popular` }, { name: `Latest` }]}
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
                      src={comment?.avatarSrc ?? defaultUserProfile}
                    />
                    <AvatarFallback>{comment?.username}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold dark:text-[#DDE5EE]">
                      {comment?.username}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        {comment?.handle}
                      </span>
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        ·
                      </span>
                      <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                        {comment?.time}
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
                </div>
                {/* Comment Content */}
                <p className="text-sm mt-1">{comment?.content}</p>
                {/* Interaction Icons */}
                <div className="flex items-center space-x-4 mt-2 max-md:flex-wrap">
                  <div
                    className="flex items-center space-x-1 text-[#999999] dark:text-[#8c9fb7a0] hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer"
                    onClick={() =>
                      setShowCommentBox(
                        showCommentBox === comment.id ? null : comment.id
                      )
                    }
                  >
                    <MessageSquareMore size={14} />
                    <span className="text-xs">{comment?.replies}</span>
                  </div>
                  {/* <div className="flex items-center space-x-1 hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <Smile size={14} />
                    <span className="text-xs">{comment?.likes}</span>
                  </div> */}
                  <div className="relative flex items-center gap-1">
                    {comment?.userLike ? (
                      <span
                        className="text-lg text-[#000] dark:text-[#DDE5EE] cursor-pointer max-w-[18px]"
                        onClick={() =>
                          handleEmojiClick(comment?.userLike, comment?.id)
                        }
                      >
                        {comment?.userLike}
                      </span>
                    ) : (
                      <Smile
                        size={18}
                        className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000] cursor-pointer"
                        onClick={() => toggleEmojiPicker(comment?.id)}
                      />
                    )}
                    <span className="text-xs ml-1 text-[#999999] dark:text-[#8c9fb7a0]">
                      {comment?.likes}
                    </span>
                    {emojiPickerState[`${comment?.id}`] && (
                      <div className="absolute bottom-7 left-0 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg z-10">
                        <div className="flex gap-2">
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              className={`text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 cursor-pointer ${
                                comment?.userLike === emoji
                                  ? "bg-gray-200 dark:bg-gray-600"
                                  : ""
                              }`}
                              onClick={() =>
                                handleEmojiClick(emoji, comment?.id)
                              }
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <div className="relative">
                    {selectedEmoji ? (
                      <span
                        className="text-lg text-[#000] dark:text-[#DDE5EE] cursor-pointer max-w-[18px] max-h-[18px]"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        {selectedEmoji}
                      </span>
                    ) : (
                      <Smile
                        size={18}
                        className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000] cursor-pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      />
                    )}
                    {showEmojiPicker && (
                      <div className="absolute bottom-7 left-0 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg z-10">
                        <div className="flex gap-2">
                          {emojis.map((emoji, idx) => (
                            <button
                              key={idx}
                              className={`text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 cursor-pointer ${
                                selectedEmoji === emoji
                                  ? "bg-gray-200 dark:bg-gray-600"
                                  : ""
                              }`}
                              onClick={() =>
                                handleEmojiClick(emoji, String(comment.id))
                              }
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div> */}
                  {/* <div className="flex items-center space-x-1 text-[#999999] dark:text-[#8c9fb7a0] hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                    <Repeat2 size={14} />
                    <span className="text-xs">{comment?.repost ?? 0}</span>
                  </div> */}
                </div>
                <AnimatePresence>
                  {showCommentBox === comment.id && (
                    <motion.div
                      className="w-full flex flex-col gap-2 border-b py-2"
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <textarea
                        className="w-full p-2 outline-none resize-none slim-scrollbar"
                        rows={1}
                        placeholder="type comment here..."
                        onChange={({ target }) => setCommentValue(target.value)}
                        value={commentValue}
                      ></textarea>
                      <FillButton
                        className="mx-2"
                        onClick={() => handleReplyComment(comment?.id)}
                      >
                        Reply
                      </FillButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* Reply Comments */}
            {comment.subComments?.length > 0 && (
              <div className="ml-12 mt-3 divide-y divide-[#2a323b7e]">
                {comment.subComments.map(
                  (subComment: any, subIndex: number) => (
                    <div key={subIndex} className="py-2">
                      <div className="flex items-start space-x-3">
                        <div className="flex flex-col gap-2">
                          <div className="w-fit h-fit">
                            <Avatar className="size-9">
                              <AvatarImage
                                width={100}
                                height={100}
                                className="w-9 h-9 object-cover"
                                src={
                                  subComment?.avatarSrc ?? defaultUserProfile
                                }
                              />
                              <AvatarFallback>
                                {subComment?.username}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-1">
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold dark:text-[#DDE5EE]">
                                {subComment?.username}
                              </span>
                              <div className="flex items-center">
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  {subComment?.handle}
                                </span>
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  ·
                                </span>
                                <span className="text-xs text-[#999999] dark:text-[#8c9fb7a0]">
                                  {subComment?.time}
                                </span>
                              </div>
                            </div>
                            {String(user?.id) ===
                              String(subComment?.userInfo?.id) && (
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
                                      onClick={() =>
                                        handleReplyDeleteComment(
                                          subComment?.id,
                                          comment?.id
                                        )
                                      }
                                    >
                                      <Trash2 className="text-red-700" /> Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuGroup>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                          <p className="text-sm mt-1">{subComment?.content}</p>
                          <div className="flex items-center space-x-4 mt-2 max-md:flex-wrap">
                            <div className="flex items-center space-x-1 text-[#999999] dark:text-[#8c9fb7a0] hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <MessageSquareMore size={14} />
                              <span className="text-xs">
                                {subComment?.replies}
                              </span>
                            </div>
                            <div className="relative flex items-center gap-1">
                              {subComment?.userLike ? (
                                <span
                                  className="text-lg text-[#000] dark:text-[#DDE5EE] cursor-pointer max-w-[18px]"
                                  onClick={() =>
                                    handleEmojiClick(
                                      subComment?.userLike,
                                      comment?.id,
                                      subComment?.id
                                    )
                                  }
                                >
                                  {subComment?.userLike}
                                </span>
                              ) : (
                                <Smile
                                  size={18}
                                  className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000] cursor-pointer"
                                  onClick={() =>
                                    toggleEmojiPicker(
                                      comment?.id,
                                      subComment?.id
                                    )
                                  }
                                />
                              )}
                              <span className="text-xs ml-1 text-[#999999] dark:text-[#8c9fb7a0]">
                                {subComment?.likes}
                              </span>
                              {emojiPickerState[
                                `${comment?.id}${subComment?.id}`
                              ] && (
                                <div className="absolute bottom-7 left-0 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg z-10">
                                  <div className="flex gap-2">
                                    {emojis.map((emoji, idx) => (
                                      <button
                                        key={idx}
                                        className={`text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 cursor-pointer ${
                                          subComment?.userLike === emoji
                                            ? "bg-gray-200 dark:bg-gray-600"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleEmojiClick(
                                            emoji,
                                            comment?.id,
                                            subComment?.id
                                          )
                                        }
                                      >
                                        {emoji}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* <div className="flex items-center space-x-1 text-[#999999] dark:text-[#8c9fb7a0] hover:text-[#59B4FF] dark:hover:text-[#59B4FF] cursor-pointer">
                              <Repeat2 size={14} />
                              <span className="text-xs">
                                {subComment?.repost ?? 0}
                              </span>
                            </div> */}
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
