import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-rQKPV6G3GQfwEBCxHZeJzvwe",
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching from CoinGecko:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
