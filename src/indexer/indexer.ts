import { client } from './shared';
import { INDEXER } from './config';
import { ensureIndexState, handleMintLog, topics } from './shared';

async function main() {
  console.log('[indexer] starting', { chainId: INDEXER.chainId, contract: INDEXER.contract });
  await ensureIndexState();
  if (!INDEXER.contract) {
    console.warn('[indexer] CONTRACT_ADDRESS not set. Exiting.');
    return;
  }
  const unsub = await client.watchEvent({
    address: INDEXER.contract as `0x${string}`,
    event: topics.Minted,
    onLogs: async (logs) => {
      for (const l of logs) {
        try { await handleMintLog(l); } catch (e) { console.error('handle log failed', e); }
      }
    },
    onError: (err) => console.error('[indexer] subscribe error', err),
  });
  console.log('[indexer] watching logs. Press Ctrl+C to stop.');
}

main().catch((e) => { console.error(e); process.exit(1); });

