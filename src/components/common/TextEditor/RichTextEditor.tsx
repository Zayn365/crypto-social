"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import Youtube from "@tiptap/extension-youtube";
import Mention from "@tiptap/extension-mention";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { RichTextToolbar } from "./RichTextToolbar";
import toast from "react-hot-toast";
import { defaultUserProfile } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  onChange: (content: string) => void;
  placeholder?: string;
  characterLimit?: number;
  mentionableUsers?: any[];
  onFileChange?: (files: File[]) => void;
}

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Write something...",
  characterLimit = 5000,
  mentionableUsers = [],
  onFileChange,
  ...props
}: RichTextEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const mentionExtension = Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
    suggestion: {
      items: ({ query }: any) => {
        return mentionableUsers
          .filter((user) =>
            user.username.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);
      },
      render: () => {
        let popup: HTMLElement;

        return {
          onStart: (props: any) => {
            popup = document.createElement("div");
            popup.className = "mention-items";

            const list = document.createElement("div");
            list.className = "mention-list";

            props.items.forEach((user: any) => {
              const item = document.createElement("div");
              item.className = "mention-item";

              const avatar = document.createElement("img");
              avatar.src = user.avatar || defaultUserProfile;
              avatar.className = "mention-avatar";

              const username = document.createElement("span");
              username.textContent = user.username;
              username.className = "mention-username";

              item.appendChild(avatar);
              item.appendChild(username);
              item.addEventListener("click", () => {
                props.command({ id: user.username, label: user.username });
                popup.remove();
              });

              list.appendChild(item);
            });

            popup.appendChild(list);
            document.body.appendChild(popup);

            const coords = props.clientRect?.();
            if (coords) {
              popup.style.position = "absolute";
              popup.style.left = `${coords.left}px`;
              popup.style.top = `${coords.top + 24}px`;
            }
          },
          onUpdate(props: any) {
            const list = popup.querySelector(".mention-list");
            if (list) {
              list.innerHTML = "";

              props.items.forEach((user: any) => {
                const item = document.createElement("div");
                item.className = "mention-item";

                const avatar = document.createElement("img");
                avatar.src = user.avatar || defaultUserProfile;
                avatar.className = "mention-avatar";

                const username = document.createElement("span");
                username.textContent = user.username;
                username.className = "mention-username";

                item.appendChild(avatar);
                item.appendChild(username);
                item.addEventListener("click", () => {
                  props.command({ id: user.username, label: user.username });
                  popup.remove();
                });

                list.appendChild(item);
              });
            }
          },
          onKeyDown(props: any) {
            if (props.event.key === "Escape") {
              popup.remove();
              return true;
            }
            return false;
          },
          onExit() {
            popup?.remove();
          },
        };
      },
    } as any,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-700",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border",
        },
      }),
      Code,
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: "w-full aspect-video",
        },
      }),
      //   Emoji.configure({
      //     enableEmoticons: true,
      //     suggestion: {
      //       items: ({ query }) => {
      //         return [
      //           "😀",
      //           "😃",
      //           "😄",
      //           "😁",
      //           "😆",
      //           "😅",
      //           "😂",
      //           "🤣",
      //           "😊",
      //           "😇",
      //           "🙂",
      //           "🙃",
      //           "😉",
      //           "😌",
      //           "😍",
      //           "🥰",
      //           "😘",
      //           "😗",
      //           "😙",
      //           "😚",
      //         ].filter((emoji) => emoji.includes(query));
      //       },
      //     },
      //   }),
      mentionExtension,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editor) return;

    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/") && file.size <= maxSizeInBytes
    );

    if (validFiles.length === 0) {
      toast.error("Please select valid image files");
      return;
    }

    setIsUploading(true);
    try {
      const file = validFiles[0]; // Handle single file for simplicity
      onFileChange?.([file]); // Update files in parent component

      // Convert image to base64 for immediate display
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === "string") {
          editor.chain().focus().setImage({ src: event.target.result }).run();
        }
      };
      reader.readAsDataURL(file);

      // Here you would typically upload the file to your server
      // const uploadedUrl = await uploadFile(file);
      // editor.chain().focus().setImage({ src: uploadedUrl }).run();
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Image upload error:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const addEmoji = (emojiData: any) => {
    if (editor) {
      editor.commands.insertContent(emojiData.emoji);
      setShowEmojiPicker(false);
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL:");
    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
      });
    }
  };

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="relative">
      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* {editor && (
        <>
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex gap-1 bg-background border rounded-lg shadow-lg p-1 w-fit"
          >
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("bold") ? "bg-accent" : ""
              }`}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("italic") ? "bg-accent" : ""
              }`}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("underline") ? "bg-accent" : ""
              }`}
            >
              Underline
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("strike") ? "bg-accent" : ""
              }`}
            >
              Strike
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("code") ? "bg-accent" : ""
              }`}
            >
              Code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("highlight") ? "bg-accent" : ""
              }`}
            >
              Highlight
            </button>
          </BubbleMenu>

          <FloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            className="flex gap-1 bg-background border rounded-lg shadow-lg p-1"
          >
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""
              }`}
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""
              }`}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("bulletList") ? "bg-accent" : ""
              }`}
            >
              List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("orderedList") ? "bg-accent" : ""
              }`}
            >
              Ordered
            </button>
            <button
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              className={`p-1 rounded cursor-pointer ${
                editor.isActive("taskList") ? "bg-accent" : ""
              }`}
            >
              Tasks
            </button>
          </FloatingMenu>
        </>
      )} */}

      <RichTextToolbar
        editor={editor}
        onImageUpload={triggerImageUpload}
        onEmojiPickerToggle={() => setShowEmojiPicker(!showEmojiPicker)}
        onAddYoutubeVideo={addYoutubeVideo}
        isUploading={isUploading}
      />

      <EditorContent
        editor={editor}
        className="min-h-[200px] w-full border rounded-b-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {showEmojiPicker && (
        <div className="absolute right-0 top-0 z-10">
          <EmojiPicker onEmojiClick={addEmoji} width={300} height={380} />
        </div>
      )}

      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
        <div>
          {editor.storage.characterCount.characters()}/{characterLimit}{" "}
          characters
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="disabled:opacity-50"
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="disabled:opacity-50"
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  );
}
