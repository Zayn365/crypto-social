"use client";
import { createContext, useContext, ReactNode } from "react";
import {
  useWalletConnection,
  WalletConnection,
} from "@/hooks/useWalletConnection";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";

// interface WalletContextType {
//   connection: WalletConnection;
//   connectWallet: (
//     walletType: "metamask" | "phantom"
//   ) => Promise<{ address: string; provider: any }>;
//   disconnectWallet: () => Promise<void>;
// }

// const WalletContext = createContext<any | undefined>(undefined);

// export const WalletProvider = ({ children }: { children: ReactNode }) => {
//   const { connection, connectWallet, disconnectWallet } = useWalletConnection();

//   return (
//     <WalletContext.Provider
//       value={{ connection, connectWallet, disconnectWallet }}
//     >
//       {children}
//     </WalletContext.Provider>
//   );
// };

// 1. Get projectId at https://cloud.reown.com
const projectId = "ec706bff87fbe78233c1005b514158a2";

// 2. Create a metadata object
const metadata = {
  name: "social-app",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata: metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// export const useWallet = () => {
//   const context = useContext(WalletContext);
//   if (!context) {
//     throw new Error("useWallet must be used within a WalletProvider");
//   }
//   return context;
// };
