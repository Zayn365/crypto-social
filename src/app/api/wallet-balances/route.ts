import { chainsData } from "@/contract/chainsData";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

// Define response interface
interface BalanceResponse {
  chainName: string;
  chainId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  balance?: string;
  balanceWei?: string;
  rpcUsed?: string;
  error?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("address");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    if (!ethers.isAddress(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    const balances: BalanceResponse[] = [];

    for (const chain of chainsData) {
      try {
        // Select first available HTTPS RPC
        const rpcUrl = chain.rpc.find((url) => url.startsWith("https"));
        if (!rpcUrl) {
          throw new Error("No valid HTTPS RPC found");
        }

        // Initialize provider
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        // Get balance
        const balance = await provider.getBalance(walletAddress);

        // Format balance
        const formattedBalance = ethers.formatUnits(
          balance,
          chain.nativeCurrency.decimals
        );

        balances.push({
          chainName: chain.name,
          chainId: chain.chainId,
          nativeCurrency: chain.nativeCurrency,
          balance: formattedBalance,
          balanceWei: balance.toString(),
          rpcUsed: rpcUrl,
        });
      } catch (error) {
        console.error(`Error fetching balance for ${chain.name}:`, error);
        balances.push({
          chainName: chain.name,
          chainId: chain.chainId,
          nativeCurrency: chain.nativeCurrency,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
    console.log(balances, "balancesbalances");

    return NextResponse.json(balances);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
