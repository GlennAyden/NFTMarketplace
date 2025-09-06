// CollectiblePage.tsx
// Dark-themed Collectible page with TailwindCSS (utility-first only, no custom CSS).
// Assumes Wagmi + RainbowKit Providers are already set up at a higher level.
// Paste this file into your Next.js/React project and import in a route/page.

import * as React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// ====== Global presets (strings for reuse) ======
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const cardBase =
  "rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur";
const heading = "font-semibold tracking-tight";

// ====== Dummy Data ======
type FeedItem = {
  imageUrl: string;
  title: string;
  source: string;
  date: string; // e.g., "06 Sep 2025"
};
const FEED_ITEMS: FeedItem[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1634973357973-f2ed2657db3f?q=80&w=1400&auto=format&fit=crop",
    title: "Legendary Pixel Apes drop teaser art for Season 2",
    source: "NFTDaily",
    date: "06 Sep 2025",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1614850715733-944fdc47d2ea?q=80&w=1400&auto=format&fit=crop",
    title: "Aurora Realms partners with major gaming guilds",
    source: "ChainPress",
    date: "05 Sep 2025",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1611162619969-50b02487f66c?q=80&w=1400&auto=format&fit=crop",
    title: "Generative Waves: new algorithmic art series revealed",
    source: "ArtBlocks Weekly",
    date: "04 Sep 2025",
  },
];

type Creator = { name: string; imageUrl: string };
const CREATORS: Creator[] = [
  { name: "NovaMint", imageUrl: "" },
  {
    name: "PixelApe Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=480&auto=format&fit=crop",
  },
  {
    name: "Orbit Labs",
    imageUrl:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=480&auto=format&fit=crop",
  },
  {
    name: "Koi Collective",
    imageUrl:
      "https://images.unsplash.com/photo-1520975922284-9e0ce8275c33?q=80&w=480&auto=format&fit=crop",
  },
  { name: "Solarium", imageUrl: "" },
  {
    name: "Neon Foundry",
    imageUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=480&auto=format&fit=crop",
  },
  { name: "AtlasWorks", imageUrl: "" },
  {
    name: "Moonbeam Art",
    imageUrl:
      "https://images.unsplash.com/photo-1517817748499-9cfa96dbec1a?q=80&w=480&auto=format&fit=crop",
  },
  { name: "Fjord Labs", imageUrl: "" },
  {
    name: "Echo Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?q=80&w=480&auto=format&fit=crop",
  },
];

type DropCardProps = {
  creatorName: string;
  creatorImageUrl?: string;
  priceEth: number | string;
  items: number;
  mintedPercent: number; // 0..100
  status: "live" | "upcoming" | "ended";
  endsAt: string; // "DD MMM YYYY HH:mm" or "00d 00h 00m"
};

const DROPS: DropCardProps[] = [
  {
    creatorName: "PixelApe Studio",
    creatorImageUrl: "",
    priceEth: 0.07,
    items: 777,
    mintedPercent: 90,
    status: "live",
    endsAt: "00d 12h 25m",
  },
  {
    creatorName: "Aurora Realms",
    creatorImageUrl: "",
    priceEth: 0.12,
    items: 1500,
    mintedPercent: 35,
    status: "upcoming",
    endsAt: "08 Sep 2025 15:00",
  },
  {
    creatorName: "Generative Waves",
    creatorImageUrl: "",
    priceEth: 0.05,
    items: 500,
    mintedPercent: 100,
    status: "ended",
    endsAt: "04 Sep 2025 12:00",
  },
  {
    creatorName: "Koi Collective",
    creatorImageUrl: "",
    priceEth: 0.09,
    items: 999,
    mintedPercent: 62,
    status: "live",
    endsAt: "01d 03h 40m",
  },
  {
    creatorName: "Neon Foundry",
    creatorImageUrl: "",
    priceEth: 0.2,
    items: 333,
    mintedPercent: 10,
    status: "upcoming",
    endsAt: "10 Sep 2025 10:00",
  },
  {
    creatorName: "Echo Studio",
    creatorImageUrl: "",
    priceEth: 0.08,
    items: 420,
    mintedPercent: 100,
    status: "ended",
    endsAt: "03 Sep 2025 18:00",
  },
  {
    creatorName: "Moonbeam Art",
    creatorImageUrl: "",
    priceEth: 0.11,
    items: 888,
    mintedPercent: 55,
    status: "live",
    endsAt: "00d 22h 10m",
  },
  {
    creatorName: "Orbit Labs",
    creatorImageUrl: "",
    priceEth: 0.06,
    items: 600,
    mintedPercent: 20,
    status: "upcoming",
    endsAt: "12 Sep 2025 09:00",
  },
];

// ====== Components ======
function Navbar() {
  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur`}
    >
      <div className={`grid grid-cols-12 items-center gap-4 py-4 ${container}`}>
        {/* Left tabs */}
        <nav
          className="col-span-12 xs:col-span-6 sm:col-span-3 lg:col-span-3 flex items-center gap-1"
          aria-label="Primary"
        >
          <a
            href="#"
            aria-current="true"
            className="text-sm px-3 py-2 rounded-lg hover:bg-white/10 aria-[current=true]:bg-white/15 aria-[current=true]:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          >
            Collectible
          </a>
          <a
            href="#"
            className="text-sm px-3 py-2 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          >
            Explore
          </a>
          <a
            href="#"
            className="text-sm px-3 py-2 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          >
            Mint
          </a>
        </nav>

        {/* Search */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Collectibles"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus-visible:outline-none"
              aria-label="Search Collectibles"
            />
          </div>
        </div>

        {/* Right: Connect */}
        <div className="col-span-12 sm:col-span-3 lg:col-span-3 flex justify-end">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

function Feed() {
  const [active, setActive] = React.useState(0);
  const item = FEED_ITEMS[active];

  function next() {
    setActive((i) => (i + 1) % FEED_ITEMS.length);
  }
  function prev() {
    setActive((i) => (i - 1 + FEED_ITEMS.length) % FEED_ITEMS.length);
  }

  return (
    <section
      className={`${cardBase} mt-6 p-0 overflow-hidden relative min-h-[280px] sm:min-h-[340px]`}
      aria-label="Latest NFT News"
    >
      {/* Header small badge */}
      <div className="absolute left-4 top-4 text-xs px-2 py-1 rounded-lg bg-black/40 border border-white/10">
        Latest
      </div>

      {/* Image */}
      <div className="absolute inset-0">
        {/* Use next/image if available; fallback to img */}
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/50 to-transparent">
        <h2 className="text-base sm:text-lg font-semibold">{item.title}</h2>
        <p className="mt-1 text-xs text-slate-300">
          {item.source} • {item.date}
        </p>

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

function CreatorsScroller({
  onClickItem,
}: {
  onClickItem?: (c: Creator) => void;
}) {
  return (
    <section className="mt-6 sm:mt-8">
      <h3 className={`text-base sm:text-lg ${heading}`}>Creators</h3>

      <div className="relative">
        <div className="mt-3 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/10">
          {CREATORS.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onClickItem?.(c)}
              className={`${cardBase} snap-start shrink-0 w-[160px] sm:w-[180px] p-3 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] text-left`}
            >
              <div className="aspect-square w-full rounded-xl bg-white/10 border border-white/10 overflow-hidden">
                {c.imageUrl ? (
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-xs text-slate-300">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-2 text-sm font-medium truncate">{c.name}</div>
            </button>
          ))}
        </div>

        {/* Optional right arrow */}
        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
          <div className="pointer-events-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition duration-200 px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]">
            ➜
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusChip({
  status,
  label,
}: {
  status: DropCardProps["status"];
  label: string;
}) {
  const base =
    "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] border";
  if (status === "live") {
    return (
      <span className={`${base} border-emerald-400/30 bg-emerald-400/10 text-emerald-300`}>
        ● Live
      </span>
    );
  }
  if (status === "upcoming") {
    return (
      <span className={`${base} border-amber-400/30 bg-amber-400/10 text-amber-300`}>
        ⧗ Upcoming
      </span>
    );
  }
  return (
    <span className={`${base} border-white/15 bg-white/5 text-slate-300`}>
      ■ Ended
    </span>
  );
}

function DropCard(props: DropCardProps) {
  const { creatorName, priceEth, items, mintedPercent, status, endsAt } = props;
  return (
    <article
      className={`${cardBase} overflow-hidden hover:bg-white/10 transition focus-within:ring-2 focus-within:ring-white/30`}
    >
      {/* Header image area */}
      <div className="relative">
        <div className="h-40 w-full bg-gradient-to-b from-sky-700/70 to-sky-900/70" />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/70">
          Creator image / Profile
        </div>
      </div>

      {/* Blue name bar */}
      <div className="bg-sky-700 text-white px-4 py-3">
        <div className="text-sm font-semibold">{creatorName}</div>
      </div>

      {/* Body info */}
      <div className="px-4 py-3 grid grid-cols-3 gap-3 text-xs text-slate-200">
        <div>
          <div className="text-slate-400 text-[11px]">Price</div>
          <div className="font-medium">{typeof priceEth === "number" ? `${priceEth.toFixed(2)} ETH` : `${priceEth} ETH`}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[11px]">Items</div>
          <div className="font-medium">{items}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[11px]">Minted</div>
          <div className="font-medium">{mintedPercent}%</div>
        </div>
      </div>

      {/* Footer status */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <StatusChip status={status} label={status} />
        <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-200">
          ⏳ Ends: {endsAt}
        </span>
      </div>
    </article>
  );
}

// ====== Page ======
export default function CollectiblePage() {
  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />

      <main className={container}>
        {/* Feed */}
        <Feed />

        {/* Creators */}
        <CreatorsScroller onClickItem={(c) => console.log("Creator click:", c)} />

        {/* NFT Drops Calendar */}
        <section className="mt-8 sm:mt-10">
          <h3 className={`text-base sm:text-lg ${heading}`}>NFT Drops Calendar</h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DROPS.map((d, i) => (
              <DropCard key={i} {...d} />
            ))}
          </div>
        </section>
      </main>

      <footer className={`${container} py-10 text-center text-xs text-slate-400`}>
        © {new Date().getFullYear()} Collectible — Built with Tailwind
      </footer>
    </div>
  );
}
