import { MintNFT } from "@/types";

export type MintCollection = {
  slug: string;
  nft: MintNFT;
};

export const NFT_COLLECTIONS: MintCollection[] = [
  {
    slug: "pixel-ape-studio",
    nft: {
      creatorName: "PixelApe Studio",
      imageUrl:
        "https://images.unsplash.com/photo-1611162619969-50b02487f66c?q=80&w=1200&auto=format&fit=crop",
      overview:
        "This collection merges pixel aesthetics with generative patterns, delivering dynamic traits and evolving rarities over time.",
      priceEth: 0.07,
      priceUsd: 50.0,
      minted: 180,
      totalSupply: 777,
    },
  },
  {
    slug: "aurora-realms",
    nft: {
      creatorName: "Aurora Realms",
      imageUrl:
        "https://images.unsplash.com/photo-1614850715733-944fdc47d2ea?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Aurora-inspired worlds across dimensions. Holders unlock guild quests and seasonal art drops.",
      priceEth: 0.12,
      priceUsd: 85.0,
      minted: 520,
      totalSupply: 1500,
    },
  },
  {
    slug: "koi-collective",
    nft: {
      creatorName: "Koi Collective",
      imageUrl:
        "https://images.unsplash.com/photo-1520975922284-9e0ce8275c33?q=80&w=1200&auto=format&fit=crop",
      overview:
        "Serene generative koi patterns with evolving palettes. Collect sets for hidden traits.",
      priceEth: 0.09,
      priceUsd: 65.0,
      minted: 310,
      totalSupply: 999,
    },
  },
];

