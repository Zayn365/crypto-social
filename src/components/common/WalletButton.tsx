import { useAuth } from "@/providers/AuthProvider";
import { loginWithWallet, register } from "@/services/auth";
import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function WalletButton() {
  const { address } = useAppKitAccount();
  const { setUser } = useAuth();

  const loginWallet = useMutation({
    mutationFn: loginWithWallet,
    onSuccess: ({ tokens, user }: any) => {
      setUser(user);
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Login successful`);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const registerWallet = useMutation({
    mutationFn: register,
    onSuccess: ({ tokens }: any) => {
      setCookie("token", {
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });
      toast.success(`Register successful`);
    },
    onError: ({ response }: any) => {
      if (response.data.message === "This user already exits") {
        loginWallet.mutate({
          password: address ?? "",
          walletAddress: address ?? "",
        });
      }
    },
  });

  useEffect(() => {
    try {
      registerWallet.mutate({
        password: address ?? "",
        roleId: 2,
        walletAddress: address ?? "",
      });
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  return (
    <>
      <appkit-button balance="hide" />
    </>
  );
}
