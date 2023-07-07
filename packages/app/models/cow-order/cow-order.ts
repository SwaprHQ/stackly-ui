type ChainId = 1 | 100;

export const COW_API_BASE_URL: Readonly<Record<ChainId, string>> = {
  1: `https://api.cow.fi/mainnet/api/v1`,
  100: `https://api.cow.fi/xdai/api/v1`
};

const COW_EXPLORER_BASE_URL = "https://explorer.cow.fi/";

export const COW_API_EXPLORER_URL: Readonly<Record<ChainId, string>> = {
  1: COW_EXPLORER_BASE_URL + "orders/",
  100: COW_EXPLORER_BASE_URL + "gc/orders/"
};

export const cowExplorerUrl = (chainId: ChainId, uid: string) =>
  COW_API_EXPLORER_URL[chainId] + uid;
