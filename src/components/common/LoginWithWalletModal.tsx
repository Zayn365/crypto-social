import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Label from "./label";
import Input from "./input";
import { useAuth } from "@/providers/AuthProvider";
import { isAddress } from "ethers";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, loginWithWallet, register } from "@/services/auth";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { updateUserInfo } from "@/services/user";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { ChevronLeft } from "lucide-react";
import { validateWalletAddress } from "@/lib/utils";
interface AuthModalProps {
  openAuthWalletModal: boolean;
  onClose: () => void;
  connectModal: () => void;
}

interface Data {
  email: string;
  password: string;
  confirmPassword: string;
  walletAddress: string;
}

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  walletAddress?: string;
}

export default function LoginWithWalletModal({
  openAuthWalletModal,
  onClose,
  connectModal,
}: AuthModalProps) {
  const { open: openWalletModal } = useAppKit();
  const { address } = useAppKitAccount();
  const { setUser } = useAuth();
  // const { disconnect } = useDisconnect();

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

  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [touched, setTouched] = useState<Partial<Record<keyof Data, boolean>>>(
    {}
  );
  const [forgot, setForgot] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (!confirmPassword) return "Confirm password is required";
    if (password !== confirmPassword) return "Passwords do not match";
    return "";
  };

  // const validateWalletAddress = (walletAddress: string) => {
  //   if (!walletAddress) return "Wallet address is required";
  //   if (!isAddress(walletAddress))
  //     return "Invalid Ethereum wallet address (e.g., 0x1234...5678)";
  //   return "";
  // };

  const validateForm = () => {
    const newErrors: Errors = {};

    newErrors.password = validatePassword(data.password);
    newErrors.walletAddress = validateWalletAddress(data.walletAddress);

    if (activeTab === "signup") {
      newErrors.confirmPassword = validateConfirmPassword(
        data.password,
        data.confirmPassword
      );
      newErrors.email = validateEmail(data.email);
    }

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [data, touched]);

  useEffect(() => {
    if (address) {
      setData((prevData) => ({
        ...prevData,
        walletAddress: address,
      }));
      setTouched((prev) => ({ ...prev, walletAddress: true }));
    }
  }, [address]);

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
      confirmPassword: "",
      walletAddress: "",
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const updateProfile = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: ({ user }: any) => {
      setUser(user);
    },
    onError: ({ message }) => {
      toast.error(message);
      setLoading(false);
    },
  });

  const loginWallet = useMutation({
    mutationFn: loginWithWallet,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Login successful`);
      connectModal();
      onClose();
    },
    onError: ({ response }: any) => {
      toast.error(response.data.message);
      setLoading(false);
    },
  });

  const registerWallet = useMutation({
    mutationFn: register,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Register successful`);
      updateProfile.mutate({
        userId: user?.id,
        name: data?.email.split("@")[0],
        email: data?.email,
        // username: data?.email.split("@")[0],
        wallet_address: data?.walletAddress,
      });
      connectModal();
      onClose();
    },
    onError: ({ response }: any) => {
      toast.error(response.data.message);
      setLoading(false);
    },
  });

  const forgotUserPassword = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success(`Please check your email`);
      resetForm();
      connectModal();
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong");
      setLoading(false);
    },
  });

  const handleRegisterUser = () => {
    try {
      if (!isFormValid) {
        toast.error("Please fill all fields");
        validateForm();
        return;
      }
      setLoading(true);
      registerWallet.mutate({
        email: data?.email,
        password: data?.password,
        roleId: 2,
        walletAddress: data?.walletAddress,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleLoginUser = () => {
    try {
      if (!isFormValid) {
        toast.error("Please fill all fields");
        validateForm();
        return;
      }
      setLoading(true);
      loginWallet.mutate({
        password: data?.password ?? "",
        walletAddress: data?.walletAddress ?? "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleConnectWallet = () => {
    openWalletModal();
  };

  const handleForgotUserPassword = () => {
    try {
      forgotUserPassword.mutateAsync({
        email: data?.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={openAuthWalletModal}
      onClose={() => {
        onClose();
        resetForm();
      }}
      className="dark:bg-[#1d1c34] w-full max-w-3xl"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {!forgot && (
          <TabsList>
            <TabsTrigger value="signin" className="cursor-pointer">
              Signin Wallet
            </TabsTrigger>
            <TabsTrigger value="signup" className="cursor-pointer">
              Signup Wallet
            </TabsTrigger>
          </TabsList>
        )}
        <TabsContent value="signin">
          {forgot && (
            <div className="bg-[#FFFFFF80] p-2 rounded-md w-fit mb-4">
              <ChevronLeft
                className="cursor-pointer"
                onClick={() => setForgot(false)}
              />
            </div>
          )}{" "}
          <div className="flex flex-col gap-4">
            {!forgot && (
              <>
                <Label className="flex-col items-start block">
                  Wallet Address
                  <div className="relative">
                    <appkit-button balance="hide" />
                    {/* <Input
                      placeholder="Connect your wallet"
                      type={"text"}
                      value={data?.walletAddress}
                      readOnly
                      onBlur={() => handleBlur("walletAddress")}
                      aria-describedby={
                        errors.walletAddress ? "walletAddress-error" : undefined
                      }
                    />
                    <button
                      type="button"
                      onClick={handleConnectWallet}
                      className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
                    >
                      Connect
                    </button> */}
                  </div>
                  {errors.walletAddress && (
                    <span
                      id="walletAddress-error"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.walletAddress}
                    </span>
                  )}
                </Label>
                <Label className="flex-col items-start block">
                  Password
                  <div className="relative">
                    <Input
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      value={data?.password}
                      onChange={({ target }) =>
                        handleChange("password", target.value)
                      }
                      onBlur={() => handleBlur("password")}
                      aria-describedby={
                        errors.password ? "password-error" : undefined
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
                  {errors.password && (
                    <span
                      id="password-error"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.password}
                    </span>
                  )}
                </Label>
              </>
            )}

            {forgot && (
              <Label className="flex-col items-start block">
                Email
                <Input
                  placeholder="Enter email"
                  type="email"
                  value={data?.email}
                  onChange={({ target }) => handleChange("email", target.value)}
                  onBlur={() => handleBlur("email")}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </Label>
            )}

            {!forgot && (
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => setForgot(true)}
              >
                Forgot Password?
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="signup">
          {" "}
          <div className="flex flex-col gap-4">
            <Label className="flex-col items-start block">
              Email
              <Input
                placeholder="Enter email"
                type="email"
                value={data?.email}
                onChange={({ target }) => handleChange("email", target.value)}
                onBlur={() => handleBlur("email")}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </Label>
            <Label className="flex-col items-start block">
              Wallet Address
              <div className="relative">
                <appkit-button balance="hide" />
                {/* <Input
                  placeholder="Connect your wallet"
                  type={"text"}
                  value={data?.walletAddress}
                  readOnly
                  //   onChange={({ target }) =>
                  //     handleChange("password", target.value)
                  //   }
                  onBlur={() => handleBlur("walletAddress")}
                  aria-describedby={
                    errors.walletAddress ? "walletAddress-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={handleConnectWallet}
                  className="absolute right-2 top-2 text-xs text-gray-500 cursor-pointer"
                >
                  Connect
                </button> */}
              </div>
              {errors.walletAddress && (
                <span
                  id="walletAddress-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.walletAddress}
                </span>
              )}
            </Label>
            <Label className="flex-col items-start block">
              Password
              <div className="relative">
                <Input
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={data?.password}
                  onChange={({ target }) =>
                    handleChange("password", target.value)
                  }
                  onBlur={() => handleBlur("password")}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
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
              {errors.password && (
                <span id="password-error" className="text-red-500 text-xs mt-1">
                  {errors.password}
                </span>
              )}
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
                  onBlur={() => handleBlur("confirmPassword")}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
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
              {errors.confirmPassword && (
                <span
                  id="confirmPassword-error"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.confirmPassword}
                </span>
              )}
            </Label>
          </div>
        </TabsContent>
      </Tabs>
      {forgot && (
        <button
          onClick={handleForgotUserPassword}
          className={`text-white text-sm rounded-full px-4 py-2 font-bold capitalize cursor-pointer bg-[#5773ff]`}
        >
          Forgot Password
        </button>
      )}
      {!forgot && (
        <button
          onClick={
            activeTab === "signin" ? handleLoginUser : handleRegisterUser
          }
          disabled={loading || !isFormValid}
          className={`text-white text-sm rounded-full px-4 py-2 font-bold capitalize cursor-pointer ${
            loading || !isFormValid
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#5773ff]"
          }`}
        >
          {loading
            ? "Loading..."
            : activeTab === "signin"
            ? "Sign In"
            : "Sign Up"}
        </button>
      )}
    </Modal>
  );
}
