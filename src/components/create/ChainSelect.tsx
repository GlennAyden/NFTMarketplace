"use client";

import React from "react";

type ChainOption = { id: string; label: string };

const CHAINS: ChainOption[] = [
  { id: "base", label: "Base" },
  { id: "ethereum", label: "Ethereum" },
  { id: "polygon", label: "Polygon" },
  { id: "arbitrum", label: "Arbitrum" },
  { id: "optimism", label: "Optimism" },
];

type Props = {
  value: string;
  onChange: (chainId: string) => void;
};

export default function ChainSelect({ value, onChange }: Props) {
  return (
    <div className="relative">
      <label className="block text-xs text-slate-300 mb-2">EVM Chain <span className="text-pink-400">*</span></label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        {CHAINS.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>
    </div>
  );
}

