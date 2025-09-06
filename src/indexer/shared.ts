import { createPublicClient, http, parseAbiItem, Log } from 'viem';
import { INDEXER } from './config';
import { prisma } from '@/lib/prisma';

export const client = createPublicClient({
  transport: http(INDEXER.rpcUrl),
  chain: undefined as any, // we don't need chain metadata for getLogs/subscribe
});

export const topics = {
  Minted: parseAbiItem('event Minted(address indexed minter, uint256 indexed tokenId, uint256 amount, uint256 price)'),
};

export async function upsertWallet(address: string) {
  const addr = address.toLowerCase();
  return prisma.userWallet.upsert({ where: { address: addr }, create: { address: addr }, update: {} });
}

export async function ensureIndexState() {
  return prisma.indexState.upsert({
    where: { chainId_contract: { chainId: INDEXER.chainId, contract: INDEXER.contract } },
    update: {},
    create: { chainId: INDEXER.chainId, contract: INDEXER.contract, lastBlock: INDEXER.startBlock },
  });
}

export function toDecimalWei(value: bigint) {
  // store as Decimal string, assuming 18 decimals
  return (Number(value) / 1e18).toString();
}

export async function handleMintLog(log: Log) {
  const { address, topics: t, data, blockNumber, transactionHash, logIndex } = log as any;
  if (!transactionHash) return;
  // viem decode
  const decoded = client.decodeEventLog({ abi: [topics.Minted], data, topics: t });
  const { minter, tokenId, amount, price } = decoded.args as any;
  const wallet = await upsertWallet(minter);
  const state = await prisma.indexState.findUnique({ where: { chainId_contract: { chainId: INDEXER.chainId, contract: address.toLowerCase() } } });
  // naive: map token to first collection with that contract (or create placeholder)
  const collection = await prisma.collection.findFirst({ where: { contract: address.toLowerCase() } });
  if (!collection) return; // nothing to record against

  await prisma.mintEvent.upsert({
    where: { txHash_logIndex: { txHash: transactionHash, logIndex } },
    update: {},
    create: {
      chainId: INDEXER.chainId,
      txHash: transactionHash,
      blockNumber: BigInt(blockNumber || 0),
      logIndex: Number(logIndex || 0),
      collectionId: collection.id,
      walletId: wallet.id,
      tokenId: tokenId?.toString?.() || '0',
      qty: Number(amount || 0),
      priceEth: toDecimalWei(price || 0n) as any,
      timestamp: new Date(),
    },
  });
}

