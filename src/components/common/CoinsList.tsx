"use client";
import { formatPrice } from "@/lib/utils";
import { Coin, useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";

export default function CoinsList() {
  const { coins } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCoins = coins.filter(
    (coin: Coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.shortname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
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
            filteredCoins.map((coin: Coin) => (
              <div
                key={coin.id}
                className="grid grid-cols-4 p-4 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img src={coin?.image?.thumb} /> {coin.name}
                </div>
                <div className="uppercase font-medium">{coin.shortname}</div>
                <div className={coin.price ? "font-medium" : "text-gray-400"}>
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
  );
}
