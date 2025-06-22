"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  Link,
  Image as ImageIcon,
  Code,
  Code2,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  PaintBucket,
  Highlighter,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  CheckSquare,
  Youtube,
  Smile,
  Undo2,
  Redo2,
} from "lucide-react";
import { useEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./ColorPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RichTextToolbarProps {
  editor: ReturnType<typeof useEditor>;
  onImageUpload: () => void;
  onEmojiPickerToggle: () => void;
  onAddYoutubeVideo: () => void;
  isUploading: boolean;
}

export function RichTextToolbar({
  editor,
  onImageUpload,
  onEmojiPickerToggle,
  onAddYoutubeVideo,
  isUploading,
}: RichTextToolbarProps) {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addCodeBlock = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border border-b-0 rounded-t-lg p-2 bg-background">
      {/* Text formatting */}
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-accent" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-accent" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-accent" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-accent" : ""}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-accent" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "bg-accent" : ""}
      >
        <Highlighter className="h-4 w-4" />
      </Button> */}

      {/* Text align */}
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "bg-accent" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "bg-accent" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "bg-accent" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "bg-accent" : ""}
      >
        <AlignJustify className="h-4 w-4" />
      </Button> */}

      {/* Color picker */}
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <PaintBucket className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-2">
          <ColorPicker
            onChange={(color) => editor.chain().focus().setColor(color).run()}
            currentColor={editor.getAttributes("textStyle").color}
          />
        </PopoverContent>
      </Popover> */}

      {/* Lists */}
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-accent" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-accent" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "bg-accent" : ""}
      >
        <CheckSquare className="h-4 w-4" />
      </Button> */}

      {/* Blocks */}
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addCodeBlock}
        className={editor.isActive("codeBlock") ? "bg-accent" : ""}
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addTable}
        className={editor.isActive("table") ? "bg-accent" : ""}
      >
        <Table className="h-4 w-4" />
      </Button> */}

      {/* Media */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onImageUpload}
        disabled={isUploading}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onAddYoutubeVideo}
      >
        <Youtube className="h-4 w-4" />
      </Button>

      {/* Emoji */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onEmojiPickerToggle}
      >
        <Smile className="h-4 w-4" />
      </Button>

      {/* Link */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={setLink}
        className={editor.isActive("link") ? "bg-accent" : ""}
      >
        <Link className="h-4 w-4" />
      </Button>

      {/* Undo/Redo */}
      {/* <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 className="h-4 w-4" />
      </Button> */}
    </div>
  );
}
