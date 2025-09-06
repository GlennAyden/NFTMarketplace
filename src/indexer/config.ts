import 'dotenv/config';

export const INDEXER = {
  rpcUrl: process.env.RPC_URL as string,
  chainId: Number(process.env.CHAIN_ID || 8453), // default Base
  contract: (process.env.CONTRACT_ADDRESS || '').toLowerCase(),
  startBlock: BigInt(process.env.START_BLOCK || '0'),
};

if (!INDEXER.rpcUrl) {
  throw new Error('RPC_URL is required for indexer');
}

