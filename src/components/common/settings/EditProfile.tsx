import React, { useEffect, useRef, useState } from "react";
import Label from "../label";
import Input from "../input";
import { useAuth } from "@/providers/AuthProvider";
import ProfileUpload from "../profile-upload-modal";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { updateUserInfo, uploadAvatar, uploadCover } from "@/services/user";
import toast from "react-hot-toast";
import { blobToWebP } from "webp-converter-browser";
import FillButton from "../FillButton";
import {
  cn,
  defaultUserCover,
  defaultUserProfile,
  formatDateWithAgo,
  validateImageAspectRatio,
} from "@/lib/utils";
import { UploadIcon } from "lucide-react";
import Image from "next/image";

interface UserData {
  avatar: string | File | null;
  cover: string | File | null;
  name: string;
  email: string;
  username: string;
  created_date_time: string;
}

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const { address } = useAppKitAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState<UserData>({
    avatar: user?.avatar || "",
    cover: user?.cover || "",
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    created_date_time: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.avatar || defaultUserProfile
  );
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>(
    user?.avatar || defaultUserCover
  );

  useEffect(() => {
    setUserData({
      avatar: user?.avatar || defaultUserProfile,
      cover: user?.cover || "",
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      created_date_time: user?.created_date_time || "",
    });
    setPreviewUrl(user?.avatar || defaultUserProfile);
    setCoverPreviewUrl(user?.cover || defaultUserCover);
  }, [user]);

  useEffect(() => {
    return () => {
      if (typeof userData.avatar !== "string" && userData.avatar) {
        URL.revokeObjectURL(previewUrl);
      }
      if (typeof userData.cover !== "string" && userData.cover) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [previewUrl, userData.avatar, coverPreviewUrl, userData?.cover]);

  const handleChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateProfilePic = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: ({ user }: any) => {
      setUserData((prev) => ({ ...prev, avatar: user.url || prev.avatar }));
      setPreviewUrl(user.url);
      setUser((prev: any) => ({ ...prev, avatar: user.url }));
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const updateProfileCover = useMutation({
    mutationFn: uploadCover,
    onSuccess: ({ user }: any) => {
      setUserData((prev) => ({ ...prev, cover: user.url || prev.cover }));
      setCoverPreviewUrl(user.url);
      setUser((prev: any) => ({ ...prev, cover: user.url }));
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const updateProfile = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: ({ user }: any) => {
      setUser(user);
      toast.success(`Updated successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleProfileUpload = async () => {
    try {
      const webp = await blobToWebP(userData.avatar as File);
      const webpFile = new File([webp], "avatar.webp", {
        type: "image/webp",
        lastModified: Date.now(),
      });
      updateProfilePic.mutateAsync({
        id: user?.id,
        avatar: webpFile,
      });
    } catch (error) {
      console.log(error);
      setPreviewUrl("");
    }
  };

  const handleCoverUpload = async () => {
    try {
      const webp = await blobToWebP(userData.cover as File);
      const webpFile = new File([webp], "cover.webp", {
        type: "image/webp",
        lastModified: Date.now(),
      });
      updateProfileCover.mutateAsync({
        id: user?.id,
        cover: webpFile,
      });
    } catch (error) {
      console.log(error);
      setCoverPreviewUrl("");
    }
  };

  const handleProfileUpdate = () => {
    try {
      if (userData.avatar instanceof File) {
        handleProfileUpload();
      }
      if (userData.cover instanceof File) {
        handleCoverUpload();
      }
      updateProfile.mutate({
        userId: user?.id,
        name: userData?.name,
        email: userData?.email,
        username: userData?.username,
        wallet_address: address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (file: File | null) => {
    setUserData((prev) => ({ ...prev, avatar: file }));
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
    } else {
      setPreviewUrl(user?.avatar || defaultUserProfile);
    }
  };

  const handleCoverChange = async (file: File | null) => {
    if (!file) {
      setUserData((prev) => ({ ...prev, cover: null }));
      setCoverPreviewUrl(user?.cover || defaultUserCover);
      return;
    }

    const isValid = await validateImageAspectRatio(file, 16 / 9);

    if (!isValid) {
      toast.error("Cover image must have an aspect ratio of 16:9.");
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    setUserData((prev) => ({ ...prev, cover: file }));
    setCoverPreviewUrl(tempUrl);
  };

  return (
    <div className="p-4">
      <div className="text-xl font-bold">My Profile</div>
      <div className="text-sm dark:text-[#A3ADB9] text-[#2f2f2f]">
        Your profile was created on {formatDateWithAgo(user?.created_date_time)}
        .
      </div>
      <div className="mt-4">
        <div
          className={cn(
            "flex flex-col items-center gap-4 w-fit cursor-pointer my-4"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={coverPreviewUrl || defaultUserCover}
            width={750}
            height={165}
            alt="cover"
            className="w-[750px] h-[165px] object-cover rounded-md"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) =>
              handleCoverChange(
                e.target.files && e.target.files[0] ? e.target.files[0] : null
              )
            }
            accept="image/jpeg,image/jpg,image/png,image/gif"
            className="hidden"
            aria-label="Upload profile picture"
          />
          <div className="flex items-center gap-2 w-full">
            <UploadIcon size={20} className="text-neutral-250" />

            <div
              className={cn(
                "text-neutral-250 dark:text-neutral-50 font-[400] text-[15px] leading-5"
              )}
            >
              {"Upload your Profile Cover"}
            </div>
          </div>
        </div>
        <ProfileUpload
          onChange={handleFileChange}
          srcUrl={previewUrl}
          fallbackText="profile"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          <Label className="flex-col items-start block">
            Name
            <Input
              placeholder="name"
              className=""
              type="text"
              value={userData?.name}
              onChange={({ target }) => handleChange("name", target.value)}
            />
          </Label>
          <Label className="flex-col items-start block">
            Email
            <Input
              placeholder="email"
              className=""
              type="email"
              value={userData?.email}
              onChange={({ target }) => handleChange("email", target.value)}
            />
          </Label>
          <Label className="flex-col items-start block">
            Username
            <Input
              placeholder="username"
              className=""
              type="text"
              value={userData?.username}
              onChange={({ target }) => {
                const value = target.value;
                if (/^[a-zA-Z0-9]*$/.test(value) || value === "") {
                  handleChange("username", value);
                }
              }}
            />
          </Label>
          <Label className="flex-col items-start block">
            Wallet
            <Input placeholder="wallet" className="" value={address ?? ""} />
          </Label>
        </div>
        <FillButton onClick={handleProfileUpdate} className="w-full mt-4">
          Update
        </FillButton>
      </div>
    </div>
  );
}
