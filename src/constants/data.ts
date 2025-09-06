// Sample data for the NFT Marketplace
import { FeedItem, Creator, DropCard, MintNFT } from "@/types";

export const FEED_ITEMS: FeedItem[] = [
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

export const CREATORS: Creator[] = [
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

export const DROPS: DropCard[] = [
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

export const SAMPLE_MINT_NFT: MintNFT = {
  creatorName: "PixelApe Studio",
  imageUrl: "https://images.unsplash.com/photo-1611162619969-50b02487f66c?q=80&w=1200&auto=format&fit=crop",
  overview:
    "This collection merges pixel aesthetics with generative patterns, delivering dynamic traits and evolving rarities over time. Each mint grants holders access to community events, trait upgrades, and seasonal airdrops. Crafted for collectors who value design, provenance, and playful experimentation within the NFT space. Expect vibrant palettes, hidden easter eggs, and occasional animated surprises across the series.",
  priceEth: 0.07,
  priceUsd: 50.0,
  minted: 30,
  totalSupply: 500,
};