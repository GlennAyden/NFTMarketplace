// Types for the NFT Marketplace application

export type FeedItem = {
  imageUrl: string;
  title: string;
  source: string;
  date: string;
};

export type Creator = {
  name: string;
  imageUrl: string;
};

export type DropStatus = "live" | "upcoming" | "ended";

export type DropCard = {
  creatorName: string;
  creatorImageUrl?: string;
  priceEth: number | string;
  items: number;
  mintedPercent: number;
  status: DropStatus;
  endsAt: string;
};

export type MintNFT = {
  creatorName: string;
  imageUrl?: string;
  overview: string;
  priceEth: number;
  priceUsd?: number;
  minted: number;
  totalSupply: number;
};