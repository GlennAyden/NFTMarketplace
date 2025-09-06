"use client";

import React, { useState } from "react";
import { cardBase } from "@/constants/styles";

export type GateCollection = {
  slug: string;
  title: string;
};

type Props = {
  collections: GateCollection[];
  onCreateNew: () => void;
  onViewCollection: (slug: string) => void;
};

export default function CollectionGate({ collections, onCreateNew, onViewCollection }: Props) {
  const [selected, setSelected] = useState<string>(collections[0]?.slug || "");

  return (
    <div className="mt-6">
      <div className="text-sm text-slate-300 flex items-center gap-2">
        <span className="text-lg">←</span>
        <span className="font-medium">Create NFT Drop</span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* New Collection */}
        <div className={`${cardBase} p-6`}>
          <div className="text-lg font-semibold">New Collection</div>
          <p className="mt-2 text-sm text-slate-300">
            Create a Single Edition (ERC‑1155) or a Unique Edition (ERC‑721) collection
          </p>
          <button
            type="button"
            onClick={onCreateNew}
            className="mt-6 w-full rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          >
            Create New Collection
          </button>
        </div>

        {/* Existing Collections */}
        <div className={`${cardBase} p-6`}>
          <div className="text-lg font-semibold">Existing Collections</div>
          <p className="mt-2 text-sm text-slate-300">View your deployed collections</p>
          <div className="mt-6 flex gap-2">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              {collections.length === 0 ? (
                <option value="" disabled>
                  No collections found
                </option>
              ) : (
                collections.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))
              )}
            </select>
            <button
              type="button"
              onClick={() => selected && onViewCollection(selected)}
              className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

