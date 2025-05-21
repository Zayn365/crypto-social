import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const listUrl = `https://api.coingecko.com/api/v3/asset_platforms`;
    const listResponse = await axios.get(listUrl, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-rQKPV6G3GQfwEBCxHZeJzvwe",
      },
    });

    const coins = listResponse.data;
    const coinIds = coins.map((coin: any) => coin.id).join(",");

    const priceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`;
    const priceResponse = await axios.get(priceUrl, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-rQKPV6G3GQfwEBCxHZeJzvwe",
      },
    });

    // Combine data
    const coinsWithPrices = coins.map((coin: any) => ({
      id: coin?.id,
      shortname: coin?.shortname,
      name: coin?.name,
      native_coin_id: coin?.native_coin_id,
      chain_identifier: coin?.chain_identifier || null,
      image: coin?.image,
      price: priceResponse?.data[coin?.id]?.usd || null,
    }));

    return NextResponse.json({
      coins: coinsWithPrices,
      total: coins.length,
    });
  } catch (error: any) {
    console.error("Error fetching coins with prices:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
