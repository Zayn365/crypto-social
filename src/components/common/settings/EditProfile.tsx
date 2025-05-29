import React, { useEffect, useState } from "react";
import Label from "../label";
import Input from "../input";
import { useAuth } from "@/providers/AuthProvider";
import ProfileUpload from "../profile-upload-modal";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { updateUserInfo, uploadAvatar } from "@/services/user";
import toast from "react-hot-toast";
import { blobToWebP } from "webp-converter-browser";
import FillButton from "../FillButton";
import { formatDateWithAgo } from "@/lib/utils";

interface UserData {
  avatar: string | File | null;
  name: string;
  email: string;
  username: string;
  created_date_time: string;
}

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const { address } = useAppKitAccount();

  const [userData, setUserData] = useState<UserData>({
    avatar: user?.avatar || "",
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
    created_date_time: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>(
    user?.avatar || "/userDefault.webp"
  );

  useEffect(() => {
    setUserData({
      avatar: user?.avatar || "/userDefault.webp",
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      created_date_time: user?.created_date_time || "",
    });
    setPreviewUrl(user?.avatar || "/userDefault.webp");
  }, [user]);

  useEffect(() => {
    return () => {
      if (typeof userData.avatar !== "string" && userData.avatar) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, userData.avatar]);

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
    }
  };

  const handleProfileUpdate = () => {
    try {
      if (userData.avatar as File) {
        handleProfileUpload();
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
      setPreviewUrl(user?.avatar || "/userDefault.webp");
    }
  };

  return (
    <div className="p-4">
      <div className="text-xl font-bold">My Profile</div>
      <div className="text-sm dark:text-[#A3ADB9] text-[#2f2f2f]">
        Your profile was created on {formatDateWithAgo(user?.created_date_time)}
        .
      </div>
      <div className="mt-4">
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
