// Minimal ABI events used by the indexer. Replace with your contract's ABI.
export const ABI = [
  {
    type: 'event',
    name: 'Minted',
    inputs: [
      { name: 'minter', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'amount', type: 'uint256', indexed: false },
      { name: 'price', type: 'uint256', indexed: false },
    ],
  },
] as const;

