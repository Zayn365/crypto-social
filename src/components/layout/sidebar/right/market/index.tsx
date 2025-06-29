"use client";
import BuyTokenBtn from "@/components/common/buy-token-btn";
import CreateImportWalletBtn from "@/components/common/create-import-wallet-btn";
import CreateImportWalletModal from "@/components/common/CreateImportWalletModal";
import WalletButton from "@/components/common/WalletButton";
import { BuyTokenIcon } from "@/components/svg/buy-token";
import { sliceMethod } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useAppKitAccount } from "@reown/appkit/react";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Market() {
  const { user } = useAuth();
  const { address } = useAppKitAccount();
  const [walletModal, setWalletModal] = useState<boolean>(false);

  const handleWalletModal = () => {
    setWalletModal(!walletModal);
  };
  return (
    <div className="flex w-full flex-col gap-4 overflow-auto px-4 slim-scrollbar">
      <div>
        <div className="z-0 w-full rounded-2xl border border-border-light bg-transparent py-4">
          <div className="mb-1 flex items-center justify-between">
            <div className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-widest text-[#999999] dark:text-[#8c9fb7a0]">
              MARKET (USD)
            </div>
            <div className="relative top-[-2px]">
              <button
                className="justify-center whitespace-nowrap rounded-full font-sans! ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-link h-6 px-3 text-xs font-normal flex items-center gap-2 py-0 underline-offset-2 hover:underline text-[#999999] dark:text-[#8c9fb7a0]"
                type="button"
              >
                <RefreshCcw size={14} />
                Refresh
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b border-border-light pb-4">
            <div className="flex w-full items-center justify-between px-4">
              <span className="flex w-3/5 items-center justify-start gap-2 text-xs text-foreground">
                <img
                  alt="FOCUS"
                  loading="lazy"
                  width="24"
                  height="24"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                />
                Block
              </span>
              <div className="w-2/5 text-end font-mono text-xs text-muted-foreground">
                <div
                  className="cursor-pointer"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-«r3et»"
                  data-state="closed"
                >
                  ~
                  <div className="inline-flex items-center text-xs coin-price">
                    $0.0002687
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex w-full items-center justify-between px-4">
              <span className="flex w-3/5 items-center justify-start gap-2 text-xs text-foreground">
                <img
                  alt="DESO"
                  loading="lazy"
                  width="24"
                  height="24"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                />
                DESO
              </span>
              <div className="w-2/5 text-end font-mono text-xs text-muted-foreground">
                <div
                  className="cursor-pointer"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-«r3f0»"
                  data-state="closed"
                >
                  ~$6.04
                </div>
              </div>
            </div> */}
            <div className="mt-2 flex items-center justify-center gap-2 px-4">
              <BuyTokenBtn clasName="!h-fit py-1 text-xs !min-w-fit">
                Buy $BLOCK
              </BuyTokenBtn>
              {/* <BuyTokenBtn clasName="!h-fit py-1 text-xs !min-w-fit">
                Buy $DESO
              </BuyTokenBtn> */}
            </div>
          </div>
          <div className="m-auto flex w-full flex-col flex-wrap items-center gap-4 mt-4">
            <div className="w-full gap-4 flex items-center justify-center">
              {!address && !user?.wallet_address ? (
                <CreateImportWalletBtn handleClick={handleWalletModal} />
              ) : address ? (
                <WalletButton />
              ) : (
                <div className="rounded-full px-4 py-2 border border-[#FFFFFF1A]">
                  {sliceMethod(user?.wallet_address)}
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <Link target="_blank" href="https://openfund.com/trade/FOCUS">
                <BuyTokenBtn>
                  <BuyTokenIcon /> Buy $BLOCK
                </BuyTokenBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CreateImportWalletModal
        open={walletModal}
        onClose={() => setWalletModal(false)}
      />
    </div>
  );
}
