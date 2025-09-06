"use client";

import React from "react";
import ImageDropzone from "./ImageDropzone";

type Props = {
  name: string;
  symbol: string;
  description: string;
  onChange: (patch: Partial<{ name: string; symbol: string; description: string; image?: File }>) => void;
};

export default function CollectionFields({ name, symbol, description, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-300 mb-1">Name <span className="text-pink-400">*</span></label>
          <input
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            placeholder="e.g. The Pond"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Symbol <span className="text-pink-400">*</span></label>
          <input
            value={symbol}
            onChange={(e) => onChange({ symbol: e.target.value.toUpperCase() })}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            placeholder="POND"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-300 mb-1">Collection Image</label>
        <ImageDropzone hint="Image that will be shown as the main image for the collection. Recommended: 800×400px JPG" onFiles={(f) => onChange({ image: f[0] })} />
      </div>

      <div>
        <label className="block text-xs text-slate-300 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 min-h-[88px]"
          placeholder="e.g. The Pond is the greatest collection ever made"
        />
      </div>
    </div>
  );
}

