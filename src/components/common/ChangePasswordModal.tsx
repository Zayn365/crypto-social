import React, { useState } from "react";
import { Modal } from "./modal";
import Label from "./label";
import Input from "./input";
import FillButton from "./FillButton";

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
  const [data, setData] = useState<IinitialData>(initialData);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      </Label>
      <FillButton className="w-full mt-4">Update</FillButton>
    </Modal>
  );
}
