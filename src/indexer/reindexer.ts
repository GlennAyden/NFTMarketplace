import { client } from './shared';
import { INDEXER } from './config';
import { handleMintLog, topics } from './shared';

const fromArg = process.argv.find((a) => a.startsWith('--from='));
const toArg = process.argv.find((a) => a.startsWith('--to='));

const from = BigInt(fromArg ? fromArg.split('=')[1] : process.env.REINDEX_FROM || '0');
const to = BigInt(toArg ? toArg.split('=')[1] : process.env.REINDEX_TO || 'latest');

async function main() {
  if (!INDEXER.contract) throw new Error('CONTRACT_ADDRESS is required');
  console.log('[reindexer] scanning', { from: from.toString(), to: to.toString?.() || 'latest' });
  const logs = await client.getLogs({
    address: INDEXER.contract as `0x${string}`,
    event: topics.Minted,
    fromBlock: from,
    toBlock: (to as any) === 'latest' ? undefined : to,
  });
  console.log(`[reindexer] got ${logs.length} logs`);
  for (const l of logs) {
    try { await handleMintLog(l as any); } catch (e) { console.error('handle log failed', e); }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

