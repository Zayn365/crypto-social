import React from "react";
import { Modal } from "./modal";
import toast from "react-hot-toast";
import XIcon from "../svg/socialHandles/x-icon";
import { useTheme } from "next-themes";
import WhatsappIcon from "../svg/socialHandles/whatsapp-icon";
import TelegramIcon from "../svg/socialHandles/telegram-icon";
import RedditIcon from "../svg/socialHandles/reddit-icon";
import LinkedinIcon from "../svg/socialHandles/linkedin-icon";
import FacebookIcon from "../svg/socialHandles/facebook-icon";
import UploadIcon from "../svg/socialHandles/upload-icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  referralLink: string;
  currentPageLink: string;
  postTitle?: string;
}

export default function ShareModal({
  open,
  onClose,
  referralLink,
  currentPageLink,
  postTitle = "Check out this post!",
}: ModalProps) {
  const { theme } = useTheme();
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: string) => {
    const encodedTitle = encodeURIComponent(postTitle);
    const encodedUrl = encodeURIComponent(currentPageLink);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "reddit":
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://web.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      default:
        // For "Share via..." (system share)
        if (navigator?.share) {
          navigator
            .share({
              title: postTitle,
              url: currentPageLink,
            })
            .catch((error) => console.error("Share failed:", error));
        } else {
          toast.error("System share not supported");
        }
        return;
    }

    window?.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const socialPlatforms = [
    {
      id: "system",
      icon: UploadIcon,
      label: "Share via...",
      platform: "system",
    },
    { id: "x", icon: XIcon, label: "X", platform: "x" },
    {
      id: "telegram",
      icon: TelegramIcon,
      label: "Telegram",
      platform: "telegram",
    },
    { id: "reddit", icon: RedditIcon, label: "Reddit", platform: "reddit" },
    {
      id: "linkedin",
      icon: LinkedinIcon,
      label: "LinkedIn",
      platform: "linkedin",
    },
    {
      id: "whatsapp",
      icon: WhatsappIcon,
      label: "WhatsApp",
      platform: "whatsapp",
    },
    {
      id: "facebook",
      icon: FacebookIcon,
      label: "Facebook",
      platform: "facebook",
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className={`dark:bg-[#1d1c34] w-full px-0 max-h-screen overflow-y-auto slim-scrollbar max-w-[768px]`}
      >
        <div className={`flex flex-col items-center gap-4 px-4`}>
          <div className="font-bold dark:text-[#DDE5EE] text-xl">
            Share this page
          </div>
          <span className="w-full border-t border-border-light"></span>
          <div className="w-full">
            <div className="text-sm dark:text-[#DDE5EE] text-[#999999] mb-2">
              Your referral link
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full bg-[#2a2a3a] text-[#DDE5EE] text-sm py-2 px-3 rounded-lg border border-gray-700 focus:outline-none"
              />
              <button
                onClick={() => handleCopy(referralLink)}
                className="dark:text-[#DDE5EE] hover:text-[#a3adb9] text-sm cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Referral Benefits */}
          <div className="w-full text-sm dark:text-[#8C9FB7A0] text-[#999999]">
            <span className="text-blue-500">Unlimited referrals!</span> You earn
            10% of the joining bonus for every referral PLUS half of all fee
            revenue they generate (including on coin trading fees)!
          </div>

          {/* Current Page Link Section */}
          <div className="w-full">
            <div className="text-sm dark:text-[#DDE5EE] text-[#999999] mb-2">
              Current page
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentPageLink}
                readOnly
                className="w-full bg-[#2a2a3a] text-[#DDE5EE] text-sm py-2 px-3 rounded-lg border border-gray-700 focus:outline-none"
              />
              <button
                onClick={() => handleCopy(currentPageLink)}
                className="dark:text-[#DDE5EE] hover:text-[#a3adb9] text-sm cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
          {/* Social Media Sharing */}
          <div className="w-full">
            <div className="text-sm dark:text-[#DDE5EE] text-[#999999] mb-4 text-center">
              Or share on social media
            </div>
            <div className="flex justify-around items-center gap-4">
              {socialPlatforms?.map(
                ({ icon: Icon, label, platform }, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleShare(platform)}
                    className="flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-full border border-gray-700 hover:bg-[#2a2a3a]">
                      <Icon
                        size={20}
                        className="text-[#DDE5EE]"
                        fill={theme === "dark" ? "#FFFFFF" : "#000000"}
                      />
                    </div>
                    <span className="text-xs dark:text-[#8C9FB7A0] text-[#999999]">
                      {label}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
