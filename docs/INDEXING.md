Indexer & Reindexer
===================

This project includes a simple on-chain log indexer (Node script) and a reindexer for backfilling, plus a Postgres database with a GraphQL API on `/api/graphql`.

1) Start Postgres
-----------------

- Copy `.env.example` to `.env.local` and adjust `DATABASE_URL` and chain variables.
- Run: `docker compose up -d db` (optional: `adminer` at http://localhost:8080).

2) Setup Prisma
---------------

- Install deps: `pnpm install`
- Generate client: `pnpm prisma:generate`
- Create tables: `pnpm db:push` (or `pnpm db:migrate` to create a migration).

3) GraphQL
----------

GraphQL Yoga endpoint lives at `/api/graphql`.

Examples:

- Query collections:

  query { collections { slug title symbol creator { address } } }

- Create collection:

  mutation($input: CreateCollectionInput!) {
    createCollection(input: $input) { id slug title }
  }

  Variables:

  { "input": { "slug": "pixel-ape-studio", "title": "PixelApe Studio", "symbol": "POND", "description": "...", "imageUrl": "...", "chainId": 8453, "artType": "same", "creatorAddress": "0x..." } }

4) Indexer
----------

Environment required in `.env.local`:

- `RPC_URL`, `CHAIN_ID`, `CONTRACT_ADDRESS`, `START_BLOCK`

Run live indexer (subscribe):

- `pnpm indexer`

Run reindexer (backfill):

- `pnpm reindex --from=0 --to=latest`

Implementation notes
--------------------

- `src/indexer/abi.ts` contains a minimal `Minted` event; replace it with your contract ABI/event(s).
- Indexer writes wallet records, and mint events. For mapping events to a `Collection`, set `Collection.contract` to your deployed address.
- If you have multiple collections / contracts, duplicate indexer instances or extend the config to accept an array of contracts.

