import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  const vs_currencies = searchParams.get('vs_currencies');

  if (!ids || !vs_currencies) {
    return NextResponse.json({ error: 'Missing required query parameters' }, { status: 400 });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vs_currencies}`;
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-rQKPV6G3GQfwEBCxHZeJzvwe',
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching from CoinGecko:', error.message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}