import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { container, cardBase } from "@/constants/styles";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";

type MintSummary = {
  slug: string;
  title: string;
  imageUrl?: string;
  priceEth: number;
  minted: number;
  totalSupply: number;
};

export default async function MintPage() {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "http";
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;
  const res = await fetch(`${base}/api/nft`, { cache: "no-store" });
  const list: MintSummary[] = await res.json();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />
      <main className={container}>
        <h1 className="text-2xl sm:text-2xl font-semibold mb-4 py-8">Featured Collections</h1>
        {(!list || list.length === 0) ? (
          <div className={`${cardBase} p-6`}>No collections available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((c) => (
              <Link
                key={c.slug}
                href={`/mint/${c.slug}`}
                className={`${cardBase} overflow-hidden hover:bg-white/10 transition`}
              >
                <div className="relative aspect-video w-full bg-white/10 border-b border-white/10">
                  {c.imageUrl ? (
                    <Image src={c.imageUrl} alt={c.title} fill className="object-cover" />
                  ) : null}
                </div>
                <div className="p-4">
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-slate-300 mt-1">{c.priceEth.toFixed(2)} ETH • {c.minted}/{c.totalSupply}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
