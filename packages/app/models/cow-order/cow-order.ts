type ChainId = 1 | 100;

export const COW_API_BASE_URL: Readonly<Record<ChainId, string>> = {
  1: `https://api.cow.fi/mainnet/api/v1`,
  100: `https://api.cow.fi/xdai/api/v1`,
};
