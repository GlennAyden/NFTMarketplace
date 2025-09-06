import { NextResponse } from "next/server";
import { NFT_COLLECTIONS } from "@/constants/nfts";

export async function GET() {
  const list = NFT_COLLECTIONS.map((c) => ({
    slug: c.slug,
    title: c.nft.creatorName,
    imageUrl: c.nft.imageUrl,
    priceEth: c.nft.priceEth,
    minted: c.nft.minted,
    totalSupply: c.nft.totalSupply,
  }));
  return NextResponse.json(list, { headers: { "Cache-Control": "no-store" } });
}

