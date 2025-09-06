"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import { cardBase } from "@/constants/styles";
import { MintNFT } from "@/types";

interface MintBoxProps {
  nft: MintNFT;
}

export default function MintBox({ nft }: MintBoxProps) {
  const { isConnected } = useAccount();
  const [qty, setQty] = useState(1);

  const percent = Math.min(
    100,
    Math.max(0, (nft.minted / Math.max(1, nft.totalSupply)) * 100)
  );
  const percentLabel = percent.toFixed(1).padStart(4, "0"); // 00.0
  const mintedPad = String(nft.minted).padStart(String(nft.totalSupply).length, "0");
  const totalPad = String(nft.totalSupply).padStart(
    Math.max(2, String(nft.totalSupply).length),
    "0"
  );
  const remaining = Math.max(0, nft.totalSupply - nft.minted);
  const canMint = isConnected && qty >= 1 && qty <= remaining && remaining > 0;

  function dec() {
    setQty((v) => Math.max(1, v - 1));
  }

  function inc() {
    setQty((v) => Math.min(remaining || 1, v + 1));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseInt(e.target.value || "0", 10);
    if (Number.isNaN(v)) return;
    setQty(Math.min(Math.max(1, v), remaining || 1));
  }

  function handleMint() {
    console.log("Mint", { qty, priceEth: nft.priceEth });
    // TODO: Integrate wagmi contract write here
  }

  return (
    <aside className={`${cardBase} p-6`}>
      {/* Top row: progress (right) */}
      <div className="mb-4 flex items-start justify-between">
        <div className="sr-only">Mint progress</div>
        <div className="text-xs text-slate-400 ml-auto">
          Total Minted {percentLabel}% {mintedPad}/{totalPad}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-4">
        <div
          className="h-full bg-sky-600 transition-[width] duration-300"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Price block */}
      <div className="mb-4">
        <div className="text-sm text-slate-400">Price</div>
        <div className="mt-1 text-lg font-bold text-white">
          {nft.priceEth.toFixed(2)} ETH
        </div>
        <div className="text-sm text-slate-400">({nft.priceUsd ? `$${nft.priceUsd.toFixed(2)}` : "($0.00)"})</div>
      </div>

      {/* Quantity selector */}
      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={qty}
          onChange={onChange}
          className="w-12 text-center rounded-lg border border-white/10 bg-black/20 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Mint quantity"
        />
        <button
          type="button"
          onClick={inc}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-sky-600 hover:bg-sky-700 text-white text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Increase quantity"
        >
          +
        </button>
        <div className="ml-auto text-xs text-slate-400">
          Remaining: {remaining}
        </div>
      </div>

      {/* Mint button */}
      <button
        type="button"
        onClick={handleMint}
        disabled={!canMint}
        className={`w-full rounded-xl py-3 font-semibold text-sm tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] ${
          canMint
            ? "bg-sky-600 hover:bg-sky-700 text-white"
            : "bg-slate-600 cursor-not-allowed text-white/80"
        }`}
      >
        {isConnected ? "MINT" : "Connect Wallet to Mint"}
      </button>
    </aside>
  );
}

