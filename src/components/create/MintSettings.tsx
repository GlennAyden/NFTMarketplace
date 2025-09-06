"use client";

import React from "react";

type Props = {
  priceEth: string;
  royaltyPct: string;
  maxSupply: string;
  perWallet: string;
  startAt: string; // ISO for datetime-local
  onChange: (patch: Partial<{ priceEth: string; royaltyPct: string; maxSupply: string; perWallet: string; startAt: string }>) => void;
};

export default function MintSettings({ priceEth, royaltyPct, maxSupply, perWallet, startAt, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Mint Price</label>
          <div className="flex">
            <input
              value={priceEth}
              onChange={(e) => onChange({ priceEth: e.target.value })}
              className="w-full rounded-l-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              placeholder="0.00"
              inputMode="decimal"
            />
            <span className="inline-flex items-center rounded-r-lg border border-l-0 border-white/10 bg-white/10 px-3 text-sm">ETH</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Royalty Fee</label>
          <div className="flex">
            <input
              value={royaltyPct}
              onChange={(e) => onChange({ royaltyPct: e.target.value })}
              className="w-full rounded-l-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              placeholder="0"
              inputMode="decimal"
            />
            <span className="inline-flex items-center rounded-r-lg border border-l-0 border-white/10 bg-white/10 px-3 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Mint Limit per Wallet</label>
          <input
            value={perWallet}
            onChange={(e) => onChange({ perWallet: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            placeholder="1"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Max Supply</label>
          <input
            value={maxSupply}
            onChange={(e) => onChange({ maxSupply: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            placeholder="1000"
            inputMode="numeric"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-300 mb-1">Mint Start Date & Time</label>
          <input
            type="datetime-local"
            value={startAt}
            onChange={(e) => onChange({ startAt: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          />
        </div>
      </div>
    </div>
  );
}

