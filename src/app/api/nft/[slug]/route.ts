import { NextResponse } from "next/server";
import { NFT_COLLECTIONS } from "@/constants/nfts";

const bySlug = Object.fromEntries(
  NFT_COLLECTIONS.map((c) => [c.slug, c.nft] as const)
);

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const nft = bySlug[slug];
  if (!nft) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(nft, { headers: { "Cache-Control": "no-store" } });
}
