import React, { useState } from "react";
import { Modal } from "./modal";
import Label from "./label";
import Input from "./input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { login, registerWithEmail } from "@/services/auth";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  connectModal: () => void;
}

interface Data {
  email: string;
  password: string;
  confirmPassword: string;
  walletAddress: string;
}

export default function SignupLoginModal({
  open,
  onClose,
  connectModal,
}: AuthModalProps) {
  const { setUser } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("signin");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    confirmPassword: "",
    walletAddress: "",
  });

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = useMutation({
    mutationFn: registerWithEmail,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      router.replace("/settings");
      toast.success(`Registered successful`);
      setLoading(false);
      connectModal();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Registration failed");
      setLoading(false);
    },
  });

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      router.replace("/");
      toast.success(`Login successful`);
      setLoading(false);
      connectModal();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Login failed");
      setLoading(false);
    },
  });

  const handleRegisterUser = () => {
    try {
      setLoading(true);
      if (data.password !== data.confirmPassword) {
        toast.error("Password doesn't match");
        setLoading(false);
        return;
      }
      registerUser.mutateAsync({
        email: data?.email,
        password: data?.password,
        roleId: 2,
        walletAddress: data?.walletAddress,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginUser = () => {
    try {
      setLoading(true);
      loginUser.mutateAsync({
        email: data?.email,
        password: data?.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
      }}
      className="dark:bg-[#1d1c34] w-full max-w-3xl"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="signin">Signin</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          {" "}
          <div className="flex flex-col gap-4">
            <Label className="flex-col items-start block">
              Email
              <Input
                placeholder="Enter email"
                className=""
                type="email"
                value={data?.email}
                onChange={({ target }) => handleChange("email", target.value)}
              />
            </Label>
            <Label className="flex-col items-start block">
              Password
              <div className="relative">
                <Input
                  placeholder="Enter password"
                  className=""
                  type={showPassword ? "text" : "password"}
                  value={data?.password}
                  onChange={({ target }) =>
                    handleChange("password", target.value)
                  }
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
          </div>
        </TabsContent>
        <TabsContent value="signup">
          {" "}
          <div className="flex flex-col gap-4">
            <Label className="flex-col items-start block">
              Email
              <Input
                placeholder="Enter email"
                className=""
                type="email"
                value={data?.email}
                onChange={({ target }) => handleChange("email", target.value)}
              />
            </Label>
            <Label className="flex-col items-start block">
              Wallet Address
              <Input
                placeholder="Enter wallet address"
                className=""
                type="text"
                value={data?.walletAddress}
                onChange={({ target }) =>
                  handleChange("walletAddress", target.value)
                }
              />
            </Label>
            <Label className="flex-col items-start block">
              Password
              <div className="relative">
                <Input
                  placeholder="Enter password"
                  className=""
                  type={showPassword ? "text" : "password"}
                  value={data?.password}
                  onChange={({ target }) =>
                    handleChange("password", target.value)
                  }
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
            <Label className="flex-col items-start block">
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
          </div>
        </TabsContent>
      </Tabs>
      <button
        onClick={activeTab === "signin" ? handleLoginUser : handleRegisterUser}
        disabled={loading}
        className="text-white text-sm rounded-full bg-[#5773ff] px-4 py-2 font-bold capitalize cursor-pointer"
      >
        {loading
          ? "Loading..."
          : activeTab === "signin"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </Modal>
  );
}
