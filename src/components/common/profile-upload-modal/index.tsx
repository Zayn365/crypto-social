import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { UploadIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProfilePictureUploadProps {
  srcUrl: string;
  onChange: (file: File | null) => void;
  fallbackText?: string;
  uploadText?: string;
  showDownloadIcon?: boolean;
  textClassName?: string;
  avatarClassName?: string;
  divClasssName?: string;
}

const ProfileUpload = ({
  srcUrl,
  onChange,
  fallbackText,
  uploadText,
  showDownloadIcon,
  textClassName,
  avatarClassName,
  divClasssName,
}: ProfilePictureUploadProps) => {
  const [image, setImage] = useState<string>(srcUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImage(srcUrl);
  }, [srcUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, or GIF, WEBP)");
        return;
      }

      if (file.size > maxSize) {
        toast.error("Image size should not exceed 5MB");
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      onChange(file);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 w-fit cursor-pointer",
        divClasssName
      )}
      onClick={handleButtonClick}
    >
      <Avatar
        className={cn("border-2 border-[#a3a3a3] size-[85px]", avatarClassName)}
      >
        <AvatarImage src={image || "/userDefault.webp"} alt="Profile picture" />
        <AvatarFallback className="text-2xl bg-[#64748b] text-white">
          {fallbackText || "?"}
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
        aria-label="Upload profile picture"
      />
      <div className="flex items-center gap-2 w-full">
        {!showDownloadIcon && (
          <UploadIcon size={20} className="text-neutral-250" />
        )}
        <div
          className={cn(
            "text-neutral-250 dark:text-neutral-50 font-[400] text-[15px] leading-5",
            textClassName
          )}
        >
          {uploadText || "Upload your Profile Picture"}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;
