import React, { useEffect, useState } from "react";
import { Modal } from "./modal";
import Label from "./label";
import Input from "./input";
import { validateWalletAddress } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { updateUserInfo } from "@/services/user";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import FillButton from "./FillButton";
import { useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

interface Errors {
  walletAddress?: string;
}

export default function WalletInsertModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, setUser } = useAuth();
  const { disconnect } = useDisconnect();
  const { address } = useAppKitAccount();
  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState<string>(address ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof any, boolean>>>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: any = {};

    newErrors.walletAddress = validateWalletAddress(walletAddress);

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((error) => !error);
    setIsFormValid(isValid);
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
  };

  const updateWallet = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: ({ user }: any) => {
      setUser(user);
      toast.success(`Updated successful`);
      onClose();
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const handleUpdateWallet = () => {
    try {
      if (!isFormValid) {
        toast.error("Please insert or connect wallet");
        validateForm();
        return;
      }
      setLoading(true);
      updateWallet.mutateAsync({
        userId: user?.id,
        wallet_address: walletAddress,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      deleteCookie("token");
      setUser(null);
      disconnect();
      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    setWalletAddress(address ?? "");
  }, [address]);

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        logout();
      }}
      className="dark:bg-[#1d1c34] w-full max-w-3xl"
    >
      <div>
        <div className="text-center text-2xl font-bold">Wallet Address</div>
        <Label className="flex-col items-start block mt-4">
          Wallet Address
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="Enter wallet address 0x12345678"
              type="text"
              value={walletAddress}
              onChange={({ target }) => setWalletAddress(target.value)}
              onBlur={() => handleBlur("walletAddress")}
              aria-describedby={
                errors.walletAddress ? "walletAddress-error" : undefined
              }
            />
            <div className="whitespace-nowrap">
              <appkit-button balance="hide" />
            </div>
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
        <FillButton onClick={handleUpdateWallet} className="w-full mt-4">
          Update
        </FillButton>
      </div>
    </Modal>
  );
}
