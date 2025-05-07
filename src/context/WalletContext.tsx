"use client";
import { createContext, useContext, ReactNode } from "react";
import {
  useWalletConnection,
  WalletConnection,
} from "@/hooks/useWalletConnection";

interface WalletContextType {
  connection: WalletConnection;
  connectWallet: (
    walletType: "metamask" | "phantom"
  ) => Promise<{ address: string; provider: any }>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { connection, connectWallet, disconnectWallet } = useWalletConnection();

  return (
    <WalletContext.Provider
      value={{ connection, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
