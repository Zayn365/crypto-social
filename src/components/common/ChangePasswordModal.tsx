import React, { useState } from "react";
import { Modal } from "./modal";
import Label from "./label";
import Input from "./input";
import FillButton from "./FillButton";
import { updateUserInfo } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

interface IinitialData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialData: IinitialData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, setUser, logout } = useAuth();
  const [data, setData] = useState<IinitialData>(initialData);
  const [errors, setErrors] = useState<Partial<IinitialData>>({});
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const newErrors: Partial<IinitialData> = {};
    if (!data.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!data.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (data.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }
    if (data.newPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const updateProfile = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: ({ user }: any) => {
      setUser(user);
      toast.success("Password changed successfully");
      setData(initialData);
      onClose();
      logout();
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleProfileUpdate = () => {
    if (!validateForm()) {
      return;
    }
    try {
      updateProfile.mutate({
        userId: user?.id,
        name: user?.name,
        email: user?.email,
        wallet_address: user?.wallet_address,
        password: data?.newPassword,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      className="dark:bg-[#1d1c34] w-full max-w-3xl"
    >
      <div className="font-bold dark:text-[#DDE5EE] text-xl text-center">
        Change Password
      </div>
      <Label className="flex-col items-start block">
        Current Password
        <div className="relative">
          <Input
            placeholder="Current Password"
            className="mt-1"
            type={showPasswords.currentPassword ? "text" : "password"}
            value={data?.currentPassword}
            onChange={({ target }) =>
              handleChange("currentPassword", target.value)
            }
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("currentPassword")}
            className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
          >
            {showPasswords.currentPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.currentPassword && (
          <span className="text-red-500 text-sm">{errors.currentPassword}</span>
        )}
      </Label>
      <Label className="flex-col items-start block">
        New Password
        <div className="relative">
          <Input
            placeholder="New Password"
            className="mt-1"
            type={showPasswords.newPassword ? "text" : "password"}
            value={data?.newPassword}
            onChange={({ target }) => handleChange("newPassword", target.value)}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("newPassword")}
            className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
          >
            {showPasswords.newPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.newPassword && (
          <span className="text-red-500 text-sm">{errors.newPassword}</span>
        )}
      </Label>
      <Label className="flex-col items-start block">
        Confirm Password
        <div className="relative">
          <Input
            placeholder="Confirm Password"
            className="mt-1"
            type={showPasswords.confirmPassword ? "text" : "password"}
            value={data?.confirmPassword}
            onChange={({ target }) =>
              handleChange("confirmPassword", target.value)
            }
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("confirmPassword")}
            className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
          >
            {showPasswords.confirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
      </Label>
      <FillButton className="w-full mt-4" onClick={handleProfileUpdate}>
        Update
      </FillButton>
    </Modal>
  );
}
