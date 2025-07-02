"use client";
import React, { useState } from "react";
import Label from "../label";
import Input from "../input";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/services/auth";
import toast from "react-hot-toast";
import useUrl from "@/hooks/useUrl";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const { theme } = useTheme();
  const { query } = useUrl();
  const router = useRouter();
  const [data, setData] = useState<any>({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleChange = (name: string, value: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetUserPassword = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(`Password changed!`);
      router.replace("/");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleResetUserPassword = () => {
    if (!data.password || !data.confirmPassword) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      resetUserPassword.mutateAsync({
        password: data?.password,
        token: query.token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <div className="flex justify-center items-center w-full">
          <Image
            src={
              theme === "dark"
                ? "/blockface-logo white.svg"
                : "/blockface-logo-dark.svg"
            }
            alt="logo"
            width={150}
            height={100}
          />
        </div>
        <Label className="flex-col items-start block">
          New Password
          <div className="relative">
            <Input
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              value={data?.password}
              onChange={({ target }) => handleChange("password", target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Label>
        <Label className="flex-col items-start block mt-4">
          Confirm Password
          <div className="relative">
            <Input
              placeholder="Enter confirm password"
              type={showConfirmPassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={({ target }) =>
                handleChange("confirmPassword", target.value)
              }
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </Label>
        <button
          onClick={handleResetUserPassword}
          className={`text-white text-sm rounded-full px-4 py-2 font-bold capitalize cursor-pointer bg-[#5773ff] mt-4 w-full`}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
