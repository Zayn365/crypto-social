import React, { useState } from "react";
import { Modal } from "./modal";
import WalletButton from "./WalletButton";
import SignupLoginModal from "./SignupLoginModal";
import LoginWithWalletModal from "./LoginWithWalletModal";
import { useAppKit } from "@reown/appkit/react";

interface CreateImportWalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateImportWalletModal({
  open,
  onClose,
}: CreateImportWalletModalProps) {
  const { close } = useAppKit();
  const [agreed, setAgreed] = useState(false);
  const [authModal, setAuthModal] = useState<boolean>(false);
  const [authWalletModal, setAuthWalletModal] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setAgreed(false);
      }}
      className="dark:bg-[#1d1c34] w-full max-w-3xl"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="font-bold dark:text-[#DDE5EE] text-xl">Blockface</div>
        <div className="font-bold dark:text-[#DDE5EE] text-xl">
          Create or Import Wallet
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          Welcome to Blockface (Testnet)
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          Ready to explore what’s next?
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          Start by connecting your Decentralized Social wallet.
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          This is your key to unlocking the Blockface experience.
        </div>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[1px]">
            <span className="dark:bg-[#1d1c34] px-4 text-[#999999] dark:text-[#8c9fb7a0]">
              Check to continue
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col p-2 sm:p-0 rounded-sm sm:rounded-full border border-border mb-0">
          <div className="border-b-light flex items-start gap-0 border-b pl-2 text-[#8c9fb7a0] rounded-sm sm:rounded-full last:border-b-0 hover:bg-card hover:text-[#8c9fb7a0]">
            <input
              type="radio"
              id="terms"
              checked={agreed}
              onChange={handleCheckboxChange}
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground relative top-[10px] cursor-pointer"
            />
            <label className="font-medium text-left p-2 pr-4 w-full text-[#8c9fb7a0] hover:text-[#8c9fb7a0] text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              I have read, understood, and agree to be bound by the{" "}
              {/* <a
                target="_blank"
                className="underline underline-offset-4 hover:underline"
                href="https://docs.google.com/document/d/e/2PACX-1vTiZV1W5SbCQSAYr7Ve-yuhwVbGZj2LGf_ZaZsUDIhW-9ZFfIZqZfsfyFTwiLqZJgg4p9wYZMW0-RtQ/pub"
              > */}
              Terms of Service
              {/* </a> */}.
            </label>
          </div>
        </div>

        {agreed ? (
          <div className="flex gap-4 items-center">
            {/* <WalletButton /> */}
            <button
              onClick={() => {
                close();
                setAuthWalletModal(true);
              }}
              className="text-white text-sm rounded-full bg-[#5773ff] px-4 py-2 font-bold cursor-pointer"
            >
              Connect Wallet
            </button>
            <button
              onClick={() => setAuthModal(true)}
              className="text-white text-sm rounded-full bg-[#5773ff] px-4 py-2 font-bold cursor-pointer"
            >
              Signup / Login
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <button className="text-white text-sm rounded-full bg-gray-400 px-4 py-2 font-bold disabled cursor-not-allowed">
              Connect Wallet
            </button>
            <button className="text-white text-sm rounded-full bg-gray-400 px-4 py-2 font-bold disabled cursor-not-allowed">
              Signup / Login
            </button>
          </div>
        )}
      </div>
      <SignupLoginModal
        open={authModal}
        onClose={() => setAuthModal(false)}
        connectModal={onClose}
      />
      <LoginWithWalletModal
        openAuthWalletModal={authWalletModal}
        onClose={() => setAuthWalletModal(false)}
        connectModal={onClose}
      />
    </Modal>
  );
}
