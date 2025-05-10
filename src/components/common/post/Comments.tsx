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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const commentsData = [
  {
    follow: 224,
    username: "AniMEisLIFE",
    avatarSrc: "https://github.com/shadcn.png",
    handle: "@AniMEisLIFE",
    time: "11d ago",
    content: "Moggel supporter ARE best",
    likes: "51K",
    replies: 1,
    shares: 0,
    diamonds: 8,
    views: 2,
  },
  {
    follow: 224,
    avatarSrc: "https://github.com/shadcn.png",
    username: "NimaYas",
    handle: "@NimaYas",
    time: "11d ago",
    content: "I'M not going to the last point 😅",
    likes: "51K",
    replies: 1,
    shares: 0,
    diamonds: 5,
    subComments: [
      {
        follow: 224,
        avatarSrc: "https://github.com/shadcn.png",
        username: "BKP0WER",
        handle: "@BKP0WER",
        time: "10d ago",
        content: "😉",
        likes: "109",
        replies: 1,
        shares: 0,
        diamonds: 4,
        views: 2,
      },
    ],
  },
  {
    follow: 224,
    avatarSrc: "https://github.com/shadcn.png",
    username: "GlowArtAz",
    handle: "@GlowArtAz",
    time: "9d ago",
    content: "On it! See you when you return...",
    likes: "51K",
    replies: 1,
    shares: 0,
    diamonds: 2,
    views: 2,
    subComments: [
      {
        follow: 224,
        avatarSrc: "https://github.com/shadcn.png",
        username: "Moggel",
        handle: "@Moggel",
        time: "9d ago",
        content: "Thank you ❤️",
        likes: "",
        replies: 0,
        shares: 0,
        diamonds: 1,
        views: 2,
      },
    ],
  },
];

export default function Comments() {
  return (
    <div>
      <div className="flex justify-between items-center p-3 border-b">
        <div className="text-xs dark:text-[#8C9FB7A0] text-[#999999]">
          Comments (4)
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
        {commentsData.map((comment, index) => (
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
                      src={comment.avatarSrc}
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
                  <span className="ml-auto text-[#999999] dark:text-[#8c9fb7a0] dark:hover:bg-[#13151a] hover:bg-[#F1F1F1] p-2 rounded-full h-fit w-fit cursor-pointer">
                    <Ellipsis size={14} />
                  </span>{" "}
                  {/* More options */}
                </div>
                {/* Comment Content */}
                <p className="text-sm mt-1">{comment.content}</p>
                {/* Interaction Icons */}
                <div className="flex items-center space-x-4 mt-2 text-[#999999] dark:text-[#8c9fb7a0]">
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
                {comment.subComments.map((subComment, subIndex) => (
                  <div key={subIndex} className="pt-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col gap-2">
                        <div className="w-fit h-fit">
                          <Avatar className="size-9">
                            <AvatarImage
                              width={100}
                              height={100}
                              className="w-9 h-9 object-cover"
                              src={subComment.avatarSrc}
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
                        <div className="flex items-center space-x-4 mt-2 text-[#999999] dark:text-[#8c9fb7a0]">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
