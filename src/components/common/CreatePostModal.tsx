"use client";
import React, { useRef, useState } from "react";
import { Modal } from "./modal";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookText, Globe, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RichTextEditor } from "./TextEditor/RichTextEditor";
import { Button } from "../ui/button";
import { createPost } from "@/services/posts";
import FillButton from "./FillButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreatePostModal({ open, onClose }: ModalProps) {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [fullScreen, setFullScreen] = useState(false);
  const [content, setContent] = useState("");
  console.log("🚀 ~ CreatePostModal ~ content:", content);
  const [files, setFiles] = useState<File[]>([]);
  const editorRef = useRef<any>(null);

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return createPost(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success("Post created successfully");
      setContent("");
      setFiles([]);
      onClose();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to create post");
      console.error("Error creating post:", error);
    },
  });

  const extractLinks = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const links = Array.from(doc.getElementsByTagName("a")).map((link) => ({
      link: link.href,
      title: link.textContent || "Link",
      description: "Link inserted in post", // You can enhance this with metadata if needed
    }));
    return links;
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("title", "title");
    formData.append("description", content);
    formData.append("userId", user?.id?.toString() || "");
    formData.append("links", JSON.stringify(extractLinks(content)));
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append(
      "postInfo",
      JSON.stringify([
        {
          userId: user?.id,
          emoji: "",
          comment: "",
          like: 0,
        },
      ])
    );

    submitPost(formData);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className={`dark:bg-[#1d1c34] w-full px-0 max-h-screen overflow-y-auto slim-scrollbar ${
          fullScreen
            ? "top-[100%] w-screen min-w-screen max-w-screen h-screen left-[100%] translate-x-[-100%] translate-y-[-100%]"
            : "max-w-fit"
        }`}
      >
        <div className={`flex flex-col items-center gap-4`}>
          <div className="font-bold dark:text-[#DDE5EE] text-xl">
            Add a post
          </div>
          <span className="w-full border-t border-border-light"></span>
          <div className="flex items-center justify-between w-full gap-4 px-4">
            <div className="flex items-center gap-4">
              <div>
                <Avatar className="size-10">
                  <AvatarImage
                    width={100}
                    height={100}
                    className="rounded-full border object-cover"
                    src={user?.avatar ?? "/userDefault.webp"}
                  />
                  <AvatarFallback>{""}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-sm flex items-center gap-2">
                  {user?.name}
                  <span className="text-xs dark:text-[#A3ADB9]">
                    @{user?.username}
                  </span>
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
                onClick={() => setFullScreen(!fullScreen)}
              />
            </div>
          </div>
          <span className="w-full border-t border-border-light"></span>
          <div className="w-full px-4">
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="What's on your mind?"
              characterLimit={10000}
              mentionableUsers={[]} // Pass your list of mentionable users here
              onFileChange={setFiles}
              // ref={editorRef}
            />
          </div>

          <div className="w-full px-4 pb-4 flex justify-end gap-2">
            <FillButton
              onClick={handleSubmit}
              disabled={!content.trim() || isPending}
              className="bg-[#32bd91] hover:bg-[#32bd91]/90"
            >
              {isPending ? "Posting..." : "Post"}
            </FillButton>
          </div>
        </div>
      </Modal>
    </>
  );
}
