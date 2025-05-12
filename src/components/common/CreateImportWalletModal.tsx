import React, { useState } from "react";
import { Modal } from "./modal";
import WalletButton from "./WalletButton";

interface CreateImportWalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateImportWalletModal({
  open,
  onClose,
}: CreateImportWalletModalProps) {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };
  return (
    <Modal open={open} onClose={onClose} className="dark:bg-[#040609] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="font-bold dark:text-[#DDE5EE] text-xl">DeSo</div>
        <div className="font-bold dark:text-[#DDE5EE] text-xl">
          Create or Import DeSo Wallet
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          The first step is to create a{" "}
          <span className="dark:text-[#59B4FF] text-[#59B4FF]">
            Decentralized Social (DeSo) wallet.
          </span>
        </div>
        <div className="text-base dark:text-[#A3ADB9] text-center">
          Your DeSo wallet can{" "}
          <span className="dark:text-[#59B4FF] text-[#59B4FF]">
            send and receive money instantly
          </span>{" "}
          and it{" "}
          <span className="dark:text-[#59B4FF] text-[#59B4FF]">
            controls your content.
          </span>
        </div>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border-light"></span>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[1px]">
            <span className="dark:bg-[#040609] px-4 text-[#999999] dark:text-[#8c9fb7a0]">
              Check to continue
            </span>
          </div>
        </div>

        <div className="flex w-full cursor-pointer flex-col p-2 sm:p-0 rounded-sm sm:rounded-full border border-border mb-0">
          <div className="border-b-light flex items-start gap-0 border-b pl-2 text-[#8c9fb7a0] first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 hover:bg-card hover:text-[#8c9fb7a0]">
            <input
              type="radio"
              id="terms"
              checked={agreed}
              onChange={handleCheckboxChange}
              className="peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground relative top-[10px]"
            />
            <label className="font-medium text-left p-2 pr-4 w-full text-[#8c9fb7a0] hover:text-[#8c9fb7a0] text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              I have read, understood, and agree to be bound by the{" "}
              <a
                target="_blank"
                className="underline underline-offset-4 hover:underline"
                href="https://docs.google.com/document/d/e/2PACX-1vTiZV1W5SbCQSAYr7Ve-yuhwVbGZj2LGf_ZaZsUDIhW-9ZFfIZqZfsfyFTwiLqZJgg4p9wYZMW0-RtQ/pub"
              >
                Terms of Service
              </a>
              .
            </label>
          </div>
        </div>

        <WalletButton />
      </div>
    </Modal>
  );
}
