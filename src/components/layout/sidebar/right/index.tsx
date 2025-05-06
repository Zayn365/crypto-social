import BuyTokenBtn from "@/components/common/buy-token-btn";
import CreateImportWalletBtn from "@/components/common/create-import-wallet-btn";
import InputWithIcons from "@/components/common/input-with-icons";
import { BuyTokenIcon } from "@/components/svg/buy-token";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RightSidebar() {
  return (
    <Sidebar
      side="right"
      className="relative hidden w-[300px] justify-start border-l lg:flex dark:bg-[#040609] pl-1"
    >
      <SidebarContent className="dark:bg-[#040609]">
        <div>
          <div className="p-4">
            <InputWithIcons
              placeholder="Search..."
              endIcon={<Search size={16} />}
            />
          </div>
          <div className="flex w-full flex-col gap-4 overflow-auto px-4">
            <div>
              <div className="z-0 w-full rounded-2xl border border-border-light bg-transparent py-4">
                <div className="mb-1 flex items-center justify-between">
                  <div className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-widest text-muted">
                    MARKET (USD)
                  </div>
                  <div className="relative top-[-2px]">
                    <button
                      className="justify-center whitespace-nowrap rounded-full font-sans! ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-link h-6 px-3 text-xs font-normal flex items-center gap-2 py-0 text-muted underline-offset-2 hover:underline"
                      type="button"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                        <path d="M3 3v5h5"></path>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                        <path d="M16 16h5v5"></path>
                      </svg>
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
                        src="/_next/image?url=%2Fassets%2Fcoin-focus.png&amp;w=48&amp;q=75"
                      />
                      FOCUS
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
                  <div className="flex w-full items-center justify-between px-4">
                    <span className="flex w-3/5 items-center justify-start gap-2 text-xs text-foreground">
                      <img
                        alt="DESO"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-full"
                        src="/_next/image?url=%2Fassets%2Fcoin-deso.png&amp;w=48&amp;q=75"
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
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2 px-4">
                    <BuyTokenBtn clasName="!h-fit py-1 text-xs !min-w-fit">
                      Buy $FOCUS
                    </BuyTokenBtn>
                    <BuyTokenBtn clasName="!h-fit py-1 text-xs !min-w-fit">
                      Buy $DESO
                    </BuyTokenBtn>
                  </div>
                </div>
                <div className="m-auto flex w-full flex-col flex-wrap items-center gap-4 mt-4">
                  <div className="w-full gap-4 flex items-center justify-center">
                    <CreateImportWalletBtn />
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 w-full">
                    <Link
                      target="_blank"
                      href="https://openfund.com/trade/FOCUS"
                    >
                      <BuyTokenBtn>
                        <BuyTokenIcon /> Buy $FOCUS
                      </BuyTokenBtn>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
