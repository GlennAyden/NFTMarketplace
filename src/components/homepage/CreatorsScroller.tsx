"use client";

import { cardBase, heading } from "@/constants/styles";
import { Creator } from "@/types";

interface CreatorsScrollerProps {
  creators: Creator[];
  onClickItem?: (creator: Creator) => void;
}

export default function CreatorsScroller({ creators, onClickItem }: CreatorsScrollerProps) {
  return (
    <section className="mt-6 sm:mt-8">
      <h3 className={`text-base sm:text-lg ${heading}`}>Creators</h3>

      <div className="relative">
        <div
          className="mt-3 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {creators.map((creator, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onClickItem?.(creator)}
              className={`${cardBase} snap-start shrink-0 w-[160px] sm:w-[180px] p-3 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] text-left`}
            >
              <div className="aspect-square w-full rounded-xl bg-white/10 border border-white/10 overflow-hidden">
                {creator.imageUrl ? (
                  <img src={creator.imageUrl} alt={creator.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-xs text-slate-300">No Image</div>
                )}
              </div>
              <div className="mt-2 text-sm font-medium truncate">{creator.name}</div>
            </button>
          ))}
        </div>

        {/* Optional right arrow */}
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          <div className="pointer-events-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition duration-200 px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]">
            →
          </div>
        </div>
      </div>
    </section>
  );
}

