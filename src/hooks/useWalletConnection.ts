import { ethers } from "ethers";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
  }
}

export interface WalletConnection {
  walletType: "metamask" | "phantom" | null;
  address: string | null;
  provider: ethers.BrowserProvider | Connection | null;
  error: string | null;
}

export const useWalletConnection = () => {
  const [connection, setConnection] = useState<WalletConnection>({
    walletType: null,
    address: null,
    provider: null,
    error: null,
  });

  const connectWallet = async (walletType: "metamask" | "phantom"): Promise<{ address: string; provider: any }> => {
    try {
      if (walletType === "metamask") {
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed");
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address: string = accounts[0];

        setConnection({
          walletType: "metamask",
          address,
          provider,
          error: null,
        });

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          setConnection((prev) => ({
            ...prev,
            address: accounts[0] || null,
          }));
        });

        return { address, provider };
      } else if (walletType === "phantom") {
        const phantom = (window as any).solana;
        if (!phantom || !phantom.isPhantom) {
          throw new Error("Phantom wallet is not installed");
        }

        const response = await phantom.connect();
        const address: string = response.publicKey.toString();
        const connection = new Connection(clusterApiUrl("mainnet-beta"));

        setConnection({
          walletType: "phantom",
          address,
          provider: connection,
          error: null,
        });

        phantom.on("disconnect", () => {
          setConnection({
            walletType: null,
            address: null,
            provider: null,
            error: null,
          });
        });

        return { address, provider: connection };
      } else {
        throw new Error("Invalid wallet type");
      }
    } catch (error: any) {
      setConnection((prev) => ({
        ...prev,
        error: error.message || "Failed to connect wallet",
      }));
      throw error;
    }
  };

  const disconnectWallet = async () => {
    if (connection.walletType === "phantom") {
      const phantom = (window as any).solana;
      if (phantom && phantom.isPhantom) {
        await phantom.disconnect();
      }
    }
    setConnection({
      walletType: null,
      address: null,
      provider: null,
      error: null,
    });
  };

  useEffect(() => {
    const reconnectWallet = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_accounts", []);
          if (accounts.length > 0) {
            setConnection({
              walletType: "metamask",
              address: accounts[0],
              provider,
              error: null,
            });
            window.ethereum.on("accountsChanged", (accounts: string[]) => {
              setConnection((prev) => ({
                ...prev,
                address: accounts[0] || null,
              }));
            });
          }
        } else if ((window as any).solana?.isPhantom) {
          const phantom = (window as any).solana;
          try {
            const response = await phantom.connect({ onlyIfTrusted: true });
            const publicKey = response.publicKey.toString();
            const connection = new Connection(clusterApiUrl("mainnet-beta"));
            setConnection({
              walletType: "phantom",
              address: publicKey,
              provider: connection,
              error: null,
            });
            phantom.on("disconnect", () => {
              setConnection({
                walletType: null,
                address: null,
                provider: null,
                error: null,
              });
            });
          } catch (error) {
            // Silent fail for Phantom if not trusted
          }
        }
      } catch (error) {
        console.error("Reconnection failed:", error);
      }
    };

    reconnectWallet();
  }, []);

  return {
    connectWallet,
    disconnectWallet,
    connection,
  };
};