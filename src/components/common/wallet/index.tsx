"use client";
import React, { useEffect, useState } from "react";
import InputWithIcons from "../input-with-icons";
import { Search } from "lucide-react";
import UserAssetsData from "../user-assets-data";
import { useAppKitAccount } from "@reown/appkit/react";

type Coin = {
  id: string;
  shortname: string;
  name: string;
  native_coin_id: string;
  chain_identifier: number | null;
  image: {
    large?: string;
    small?: string;
    thumb?: string;
  };
  price: number | null;
};

type Balance = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
  };
  balance: string;
};

export default function WalletComp() {
  const { address } = useAppKitAccount();
  const [data, setData] = useState<Balance[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // const address = "0x559432E18b281731c054cD703D4B49872BE4ed53";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const [balanceResponse, priceResponse] = await Promise.all([
          fetch(`/api/wallet-balances?address=${address}`),
          fetch(`/api/getPrice`),
        ]);

        if (!balanceResponse.ok || !priceResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const balances = await balanceResponse.json();
        const priceData = await priceResponse.json();

        setData(balances);
        setCoins(priceData.coins);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load wallet data");
        setLoading(false);
      }
    };

    fetchCoins();
  }, [address]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.shortname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number | null) => {
    if (price === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 8 : 2,
    }).format(price);
  };

  const getUSDBalanceValue = (balanceItem: Balance) => {
    const matchingCoin = coins.find(
      (coin) => coin.chain_identifier === balanceItem.chainId
    );
    if (!matchingCoin?.price || !balanceItem.balance) return 0;
    const balanceValue = parseFloat(balanceItem.balance);
    return balanceValue * matchingCoin.price;
  };

  const getUSDBalance = (balanceItem: Balance) => {
    const matchingCoin = coins.find(
      (coin) => coin.chain_identifier === balanceItem.chainId
    );
    if (!matchingCoin?.price || !balanceItem.balance) return "N/A";
    const balanceValue = parseFloat(balanceItem.balance);
    return formatPrice(balanceValue * matchingCoin.price);
  };

  const getCoinLogo = (balanceItem: Balance) => {
    const matchingCoin = coins.find(
      (coin) => coin.chain_identifier === balanceItem.chainId
    );
    return matchingCoin?.image?.thumb || "/default-coin.png";
  };

  const calculateTotalBalance = () => {
    const total = data.reduce((sum, item) => sum + getUSDBalanceValue(item), 0);
    return formatPrice(total);
  };

  const sortedData = [...data].sort(
    (a, b) => getUSDBalanceValue(b) - getUSDBalanceValue(a)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="text-xl">Loading coins...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-2">
      <div className="py-8">
        <div className="">
          <h1 className="text-3xl font-bold mb-8">
            Cryptocurrency List with Prices
          </h1>

          <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
            <input
              type="text"
              placeholder="Search coins..."
              className="w-full md:w-1/3 p-3 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-lg shadow-md">
            <div className="grid grid-cols-4 p-4 font-semibold">
              <div>Name</div>
              <div>Symbol</div>
              <div>Price (USD)</div>
            </div>
            <div className="divide-y overflow-y-auto max-h-[50vh] slim-scrollbar">
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    className="grid grid-cols-4 p-4 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <img src={coin?.image?.thumb} /> {coin.name}
                    </div>
                    <div className="uppercase font-medium">
                      {coin.shortname}
                    </div>
                    <div
                      className={coin.price ? "font-medium" : "text-gray-400"}
                    >
                      {formatPrice(coin.price)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No coins found matching your search
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Assets</h1>
      {sortedData.map((item: Balance, idx: number) => (
        <div className="flex justify-between mt-4" key={idx}>
          <div className="flex items-center gap-2">
            <img
              src={getCoinLogo(item)}
              alt={item?.nativeCurrency?.name}
              className="w-6 h-6"
            />
            <div>
              <h2 className="flex items-center gap-2">
                {item?.nativeCurrency?.name}{" "}
                <h4 className="text-xs">({item?.nativeCurrency?.symbol})</h4>
              </h2>
              <h4 className="text-xs">{item?.chainName}</h4>
            </div>
          </div>
          <div>
            <h1 className="flex items-center gap-2">
              {Number(item?.balance)}{" "}
              <h4 className="text-xs">({item?.nativeCurrency?.symbol})</h4>
            </h1>
            <h1>{getUSDBalance(item)}</h1>
          </div>
        </div>
      ))}
      <div className="mt-4 flex gap-4 items-center justify-between border p-2 rounded-lg">
        <div>Total Balance:</div>
        <div>{calculateTotalBalance()}</div>
      </div>
      <div className="w-full flex justify-center items-center px-4 py-2 mt-4">
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
            On Focus, all assets & holdings are publicly viewable so you can get
            deeper insights into who you&rsquo;re interacting with.
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
    </div>
  );
}
