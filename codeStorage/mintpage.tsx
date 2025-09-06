// MintNFTPage_v2.tsx
// Tailwind-only. Layout & visuals tuned to match the provided screenshot more closely.
// Assumes Wagmi + RainbowKit Providers already configured.

import * as React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

// ====== Global tokens ======
const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8";
const cardBase =
  "rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur";
const heading = "font-semibold tracking-tight";

// ====== Types ======
type MintPageProps = {
  creatorName: string;
  imageUrl?: string;
  overview: string;
  priceEth: number;
  priceUsd?: number;
  minted: number;
  totalSupply: number;
};

// ====== Dummy ======
const DUMMY: MintPageProps = {
  creatorName: "Creator Name",
  imageUrl: "",
  overview:
    "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  priceEth: 0,
  priceUsd: 0,
  minted: 0,
  totalSupply: 50,
};

// ====== Navbar (matches screenshot style) ======
function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur">
      <div className="grid grid-cols-12 items-center gap-4 py-4 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left tabs */}
        <nav
          className="col-span-12 xs:col-span-6 sm:col-span-3 lg:col-span-3 flex items-center gap-2"
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

        {/* Center search (pill, thin border like screenshot) */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Collections"
              className="w-full rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm placeholder:text-slate-300 focus:border-white/30 focus:ring-2 focus:ring-white/20 focus-visible:outline-none"
              aria-label="Search Collections"
            />
          </div>
        </div>

        {/* Right connect */}
        <div className="col-span-12 sm:col-span-3 lg:col-span-3 flex justify-end">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

// ====== Overview card ======
function OverviewCard({ text }: { text: string }) {
  return (
    <section className={`${cardBase} mt-6 p-6`}>
      <h3 className="text-base font-semibold mb-3">Overview</h3>
      <p className="text-sm leading-relaxed text-slate-300">{text}</p>
    </section>
  );
}

// ====== Mint Box (visuals mirror screenshot) ======
function MintBox({
  priceEth,
  priceUsd,
  minted,
  totalSupply,
}: Pick<MintPageProps, "priceEth" | "priceUsd" | "minted" | "totalSupply">) {
  const { isConnected } = useAccount();
  const [qty, setQty] = React.useState(1);

  const percent = Math.min(
    100,
    Math.max(0, (minted / Math.max(1, totalSupply)) * 100)
  );
  const percentLabel = percent.toFixed(1).padStart(4, "0"); // 00.0
  const mintedPad = String(minted).padStart(String(totalSupply).length, "0");
  const totalPad = String(totalSupply).padStart(
    Math.max(2, String(totalSupply).length),
    "0"
  );
  const remaining = Math.max(0, totalSupply - minted);
  const canMint = isConnected && qty >= 1 && qty <= remaining;

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
    console.log("Mint", { qty, priceEth });
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

      {/* Price block */}
      <div className="mb-4">
        <div className="text-sm text-slate-400">Price</div>
        <div className="mt-1 text-lg font-bold text-white">
          {priceEth.toFixed(2)} ETH
        </div>
        <div className="text-sm text-slate-400">
          ({priceUsd ? `$${priceUsd.toFixed(2)}` : "($0.00)"})
        </div>
      </div>

      {/* Quantity selector (compact like screenshot) */}
      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Decrease"
        >
          –
        </button>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={qty}
          onChange={onChange}
          className="w-12 text-center rounded-lg border border-white/10 bg-black/20 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={inc}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-sky-600 hover:bg-sky-700 text-white text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
          aria-label="Increase"
        >
          +
        </button>
      </div>

      {/* Mint button (full-width blue) */}
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

// ====== Page ======
export default function MintNFTPage(props: MintPageProps = DUMMY) {
  const { creatorName, imageUrl, overview, priceEth, priceUsd, minted, totalSupply } =
    props;

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />

      <main className={container}>
        {/* Header section (left-aligned, bigger like screenshot) */}
        <h1 className="text-2xl sm:text-2xl font-semibold mb-4">{creatorName}</h1>

        {/* Grid wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-8">
            {/* Image box (solid gray placeholder, square) */}
            <section
              className={`${cardBase} w-full aspect-square overflow-hidden flex items-center justify-center`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Mint Image"
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full grid place-items-center bg-[#8d8d8d] text-slate-800 text-lg">
                  Image Mint
                </div>
              )}
            </section>

            {/* Overview below image */}
            <OverviewCard text={overview} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-4">
            <MintBox
              priceEth={priceEth}
              priceUsd={priceUsd}
              minted={minted}
              totalSupply={totalSupply}
            />
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Mint — Built with Tailwind
      </footer>
    </div>
  );
}
