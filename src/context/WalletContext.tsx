"use client";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { SolanaAdapter } from "@reown/appkit-adapter-solana/react";
import { mainnet, arbitrum, solana } from "@reown/appkit/networks";

const solanaWeb3JsAdapter = new SolanaAdapter();

// 1. Get projectId at https://cloud.reown.com
const projectId = "ec706bff87fbe78233c1005b514158a2";

// 2. Create a metadata object
const metadata = {
  name: "Blockface",
  description: "Social Dapp",
  url: "https://blockface-social-crypto.vercel.app",
  icons: ["/main-logo.png"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter(), solanaWeb3JsAdapter],
  metadata: metadata,
  networks: [mainnet, arbitrum, solana],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
  },
  // featuredWalletIds: [
  //   "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", //phantom
  //   "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", //metamask
  // ],
  // includeWalletIds: [
  //   "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", //phantom
  //   "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", //metamask
  //   "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0", // trust
  //   // "c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a",
  // ],
});

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
