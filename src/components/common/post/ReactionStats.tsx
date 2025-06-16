import {
  emojis,
  getTotalLikes,
  usePostComment,
  usePostLike,
  usePostUnLike,
} from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import {
  ChartNoAxesColumn,
  Gem,
  MessageCircle,
  Quote,
  Repeat2,
  Smile,
  Upload,
} from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import FillButton from "../FillButton";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "../ShareModal";
import useUrl from "@/hooks/useUrl";

export default function ReactionStats({ post }: any) {
  const { user } = useAuth();
  const { host, pathname } = useUrl();
  const { mutate } = usePostLike();
  const unLike = usePostUnLike();
  const postComment = usePostComment();

  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const userLike = post?.postInfo?.find(
    (post: any) => String(post?.userInfo?.id) === String(user?.id)
  );

  const selectedEmoji = userLike?.emoji || null;

  const handlelike = (selectedEmoji: string) => {
    try {
      if (user.id) {
        mutate({
          id: post?.id,
          like: true,
          userId: user.id,
          emoji: String(selectedEmoji),
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login");
    }
  };

  const handleDislike = () => {
    try {
      if (user?.id) {
        unLike.mutate({
          id: post?.id,
          like: false,
          userId: user.id,
          emoji: "",
        });
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login");
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmoji === emoji) {
      handleDislike();
    } else {
      handlelike(emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleComment = () => {
    try {
      if (user.id) {
        postComment.mutate({
          id: post?.id,
          userId: user.id,
          comment: String(commentValue),
        });
        setCommentValue("");
      } else {
        toast.error("Please Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Login");
    }
  };

  const handleRepost = () => {
    try {
      // if (user.id) {
      //   mutate({
      //     id: post?.id,
      //     repost: true,
      //     userId: user.id,
      //   });
      //   toast.success("Post reposted successfully");
      // } else {
      //   toast.error("Please Login");
      // }
      console.log("repost");
    } catch (error) {
      console.log(error);
      toast.error("Failed to repost");
    }
  };

  const list = [
    {
      no: getTotalLikes(post?.postInfo),
      name: "Reactions",
    },
    {
      no: 0,
      name: " Reposts",
    },
    {
      no: 0,
      name: " Quotes",
    },
    // {
    //   no: 0,
    //   name: "Diamonds ($0.03)",
    // },
  ];

  const actionList = [
    {
      icon: (
        <MessageCircle
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
          onClick={() => setShowCommentBox(!showCommentBox)}
        />
      ),
      action: "open",
    },
    {
      icon: (
        <div className="relative">
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
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a1c22] border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg z-10">
              <div className="flex gap-2">
                {emojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    className={`text-lg hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-1 cursor-pointer ${
                      selectedEmoji === emoji
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
      action: "open",
    },
    {
      icon: (
        <Repeat2
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
          onClick={handleRepost}
        />
      ),
      action: "open",
    },
    {
      icon: (
        <Quote
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
        />
      ),
      action: "open",
    },
    // {
    //   icon: (
    //     <Gem
    //       size={18}
    //       className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
    //     />
    //   ),
    //   action: "open",
    // },
    {
      icon: (
        <Upload
          size={18}
          className="text-[#a3adb9] dark:hover:text-[#a3adb9] hover:text-[#000]"
          onClick={() => setIsOpen(!isOpen)}
        />
      ),
      action: "open",
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999]">
          Posted on <span className="underline">Block</span> •{" "}
          {moment(post?.createdAt).format("MMM/DD/YY [@] hh:mma")}
        </div>
        {/* <div>
          {" "}
          <span
            className={`flex gap-2 items-center text-xs dark:hover:text-[#DDE5EE] hover:text-[#000000] dark:text-[#8C9FB7A0] text-[#999999]`}
          >
            <ChartNoAxesColumn size={16} /> {post?.interactions?.views}
          </span>
        </div> */}
      </div>

      <div className="border-y p-3 flex items-center justify-around">
        {list.map((item, idx) => (
          <div
            key={idx}
            className={`text-sm dark:hover:text-[#DDE5EE] hover:text-[#000000] dark:text-[#8C9FB7A0] text-[#999999] font-medium cursor-pointer`}
          >
            {item?.no} {item?.name}
          </div>
        ))}
      </div>

      <div className="p-3 flex items-center justify-around border-b">
        {actionList.map((item, idx) => (
          <div
            key={idx}
            className="rounded-full p-2 whitespace-nowrap dark:hover:bg-[#13151A] hover:bg-[#F1F1F1] border cursor-pointer"
          >
            {item?.icon}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showCommentBox && (
          <motion.div
            className="w-full flex flex-col gap-2 border-b py-2"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <textarea
              className="w-full p-2 outline-none resize-none slim-scrollbar"
              rows={2}
              placeholder="type comment here..."
              onChange={({ target }) => setCommentValue(target.value)}
              value={commentValue}
            ></textarea>
            <FillButton className="mx-2" onClick={handleComment}>
              Reply
            </FillButton>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        referralLink={`${host}${pathname}`}
        currentPageLink={`${host}${pathname}`}
        postTitle="Check out this awesome post on Block Face!"
      />
    </div>
  );
}
