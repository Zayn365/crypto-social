"use client";
import InputWithIcons from "@/components/common/input-with-icons";
import UserAssetsData from "@/components/common/user-assets-data";
import LeftSidebar from "@/components/layout/sidebar/left";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import React, { useEffect } from "react";

export default function Wallet() {
  // const { address } = useAppKitAccount();
  const COINGECKO_API = "https://api.coingecko.com/api/v3";
  const COINGECKO_API_KEY = "CG-rQKPV6G3GQfwEBCxHZeJzvwe";

  const address = "0x559432E18b281731c054cD703D4B49872BE4ed53";

  // Cache for prices to avoid repeated API calls
  const priceCache: any = {};
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  // async function getTokenPrice(coinGeckoId: string): Promise<number> {
  //   // Check cache first
  //   if (
  //     priceCache[coinGeckoId] &&
  //     priceCache[coinGeckoId].timestamp + CACHE_DURATION > Date.now()
  //   ) {
  //     return priceCache[coinGeckoId].price;
  //   }

  //   try {
  //     const url = `/api/getPrice?ids=${coinGeckoId}&vs_currencies=usd`;
  //     const response = await axios.get(url);
  //     const price = response.data[coinGeckoId]?.usd;

  //     if (typeof price !== "number") {
  //       throw new Error("Invalid price response");
  //     }

  //     // Update cache
  //     priceCache[coinGeckoId] = {
  //       price,
  //       timestamp: Date.now(),
  //     };

  //     return price;
  //   } catch (error) {
  //     console.error(`Error fetching price for ${coinGeckoId}:`, error);
  //     return 0; // Return 0 if price fetch fails
  //   }
  // }

  // async function getWalletBalances() {
  //   if (!ethers.isAddress(address)) {
  //     throw new Error("Invalid wallet address");
  //   }

  //   const balanceResults: any = {};

  //   // Process each network
  //   for (const networkKey of Object.keys(EVM_NETWORKS)) {
  //     const network = EVM_NETWORKS[networkKey];
  //     const networkResult: any = {
  //       network: network.name,
  //       nativeBalance: null,
  //       nativeBalanceUSD: null,
  //       nativeCurrency: network.nativeCurrency,
  //       success: false,
  //     };

  //     try {
  //       // Create provider with explicit network settings
  //       const provider = new ethers.JsonRpcProvider(network.rpc, {
  //         name: network.name,
  //         chainId: network.chainId,
  //       });

  //       // Get native balance
  //       const balance = await provider.getBalance(address);
  //       const formattedBalance = ethers.formatEther(balance);
  //       networkResult.nativeBalance = formattedBalance;

  //       // Get USD value
  //       const price = await getTokenPrice(network.coingeckoId);
  //       networkResult.nativeBalanceUSD = (
  //         parseFloat(formattedBalance) * price
  //       ).toFixed(2);

  //       networkResult.success = true;
  //     } catch (error: any) {
  //       networkResult.error = error.message;
  //       console.error(`Error fetching ${network.name} balance:`, error.message);
  //     }

  //     balanceResults[networkKey] = networkResult;

  //     // Small delay between requests to avoid rate limiting
  //     await new Promise((resolve) => setTimeout(resolve, 200));
  //   }
  //   let totalUSD = 0;
  //   Object.values(balanceResults).forEach((result: any) => {
  //     if (result.nativeBalanceUSD) {
  //       totalUSD += parseFloat(result.nativeBalanceUSD);
  //     }
  //   });
  //   console.log(
  //     "🚀 ~ getWalletBalances ~ balanceResults:",
  //     balanceResults,
  //     totalUSD
  //   );
  //   return {
  //     balances: balanceResults,
  //     totalUSD: totalUSD.toFixed(2),
  //   };
  // }

  async function fetchBalances() {
    const response = await fetch(`/api/wallet-balances?address=${address}`);
    const data = await response.json();
    console.log("🚀 ~ fetchBalances ~ data:", data)
    return data;
  }

  useEffect(() => {
    fetchBalances();
  }, [address]);

  return (
    <div>
      <SidebarProvider>
        <LeftSidebar />
        <div className="w-full flex justify-center items-center px-4 py-2">
          <div className="flex flex-col items-center max-w-[550px] gap-4">
            <img
              alt="whale"
              data-state="closed"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="inline-flex translate-y-[-10%]"
              src="/empty-18.webp"
            />
            <div className="font-semibold text-2xl dark:text-[#DDE5EE]">
              Search Wallets
            </div>
            <div className="text-sm text-[#999999] dark:text-[#8c9fb7a0] text-center">
              On Focus, all assets & holdings are publicly viewable so you can
              get deeper insights into who you&rsquo;re interacting with.
            </div>
            <div className="w-full">
              <InputWithIcons
                placeholder="Search users..."
                className="w-full"
                endIcon={<Search size={16} />}
              />
            </div>
            <div className="w-full rounded-2xl border border-border-light">
              <UserAssetsData />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
