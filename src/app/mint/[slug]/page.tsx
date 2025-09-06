import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MintImage from "@/components/mint/MintImage";
import OverviewCard from "@/components/mint/OverviewCard";
import MintBox from "@/components/mint/MintBox";
import { container } from "@/constants/styles";
import { MintNFT } from "@/types";
import { headers } from "next/headers";

type Props = { params: { slug: string } };

export default async function MintSlugPage({ params }: Props) {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "http";
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;
  const res = await fetch(`${base}/api/nft/${params.slug}`, { cache: "no-store" });
  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
        <Navbar />
        <main className={`${container} py-12`}>
          <h1 className="text-2xl font-semibold">Collection not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const nft: MintNFT = await res.json();

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />
      <main className={container}>
        <h1 className="text-2xl sm:text-2xl font-semibold mb-4 py-8">{nft.creatorName}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <MintImage imageUrl={nft.imageUrl} alt={`NFT by ${nft.creatorName}`} />
            <OverviewCard overview={nft.overview} />
          </div>
          <div className="lg:col-span-4">
            <MintBox nft={nft} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
