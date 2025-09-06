import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Feed from "@/components/homepage/Feed";
import CreatorsScroller from "@/components/homepage/CreatorsScroller";
import DropsSection from "@/components/homepage/DropsSection";
import { container } from "@/constants/styles";
import { Creator, DropCard as Drop, FeedItem } from "@/types";
import { headers } from "next/headers";

type Props = {
  searchParams: { q?: string };
};

function includes(hay: string, needle: string) {
  return hay.toLowerCase().includes(needle.toLowerCase());
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || "").trim();

  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "http";
  const base = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;

  const [feedRes, creatorsRes, dropsRes] = await Promise.all([
    fetch(`${base}/api/feed`, { cache: "no-store" }),
    fetch(`${base}/api/creators`, { cache: "no-store" }),
    fetch(`${base}/api/drops`, { cache: "no-store" }),
  ]);
  const [feedRaw, creatorsRaw, dropsRaw]: [FeedItem[], Creator[], Drop[]] = await Promise.all([
    feedRes.json(),
    creatorsRes.json(),
    dropsRes.json(),
  ]);

  const feed = q
    ? feedRaw.filter((i) => includes(i.title, q) || includes(i.source, q))
    : feedRaw;
  const creators = q
    ? creatorsRaw.filter((c) => includes(c.name, q))
    : creatorsRaw;
  const drops = q
    ? dropsRaw.filter(
        (d) => includes(d.creatorName, q) || includes(String(d.priceEth), q)
      )
    : dropsRaw;

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100 antialiased">
      <Navbar />
      <main className={container}>
        <h1 className="text-xl sm:text-2xl font-semibold mt-6">Search Results{q ? ` for "${q}"` : ""}</h1>
        <div className="mt-4 grid gap-8">
          <Feed items={feed} />
          <CreatorsScroller creators={creators} />
          <DropsSection drops={drops} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
