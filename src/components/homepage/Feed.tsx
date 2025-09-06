"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cardBase } from "@/constants/styles";
import { FeedItem } from "@/types";

type FeedProps = {
  items: FeedItem[];
};

export default function Feed({ items }: FeedProps) {
  const [active, setActive] = useState(0);
  const item = items[active];

  if (!items || items.length === 0) {
    return (
      <section className={`${cardBase} mt-6 p-6`} aria-label="Latest NFT News">
        <h2 className="text-base sm:text-lg font-semibold">No results</h2>
        <p className="mt-1 text-xs text-slate-300">Try a different search.</p>
      </section>
    );
  }

  function next() {
    setActive((i) => (i + 1) % Math.max(1, items.length));
  }

  function prev() {
    const len = Math.max(1, items.length);
    setActive((i) => (i - 1 + len) % len);
  }

  return (
    <section
      className={`${cardBase} mt-6 p-0 overflow-hidden relative min-h-[280px] sm:min-h-[340px]`}
      aria-label="Latest NFT News"
    >
      {/* Header small badge */}
      <div className="absolute left-4 top-4 text-xs px-2 py-1 rounded-lg bg-black/40 border border-white/10 z-10">
        Latest
      </div>

      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={item?.imageUrl || ""}
          alt={item?.title || ""}
          fill
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-base sm:text-lg font-semibold">{item.title}</h2>
        <p className="mt-1 text-xs text-slate-300">{item.source} • {item.date}</p>

        {/* Controls */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition duration-200 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
            aria-label="Previous"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition duration-200 px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
            aria-label="Next"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

