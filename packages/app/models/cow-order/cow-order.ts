import { ChainId } from "@stackly/sdk";

export const COW_API_BASE_URL: Readonly<Record<ChainId, string>> = {
  [ChainId.ETHEREUM]: `https://api.cow.fi/mainnet/api/v1`,
  [ChainId.GNOSIS]: `https://api.cow.fi/xdai/api/v1`,
};

const COW_EXPLORER_BASE_URL = "https://explorer.cow.fi/";

export const COW_API_EXPLORER_URL: Readonly<Record<ChainId, string>> = {
  [ChainId.ETHEREUM]: COW_EXPLORER_BASE_URL + "orders/",
  [ChainId.GNOSIS]: COW_EXPLORER_BASE_URL + "gc/orders/",
};

export const cowExplorerUrl = (chainId: ChainId, uid: string) =>
  COW_API_EXPLORER_URL[chainId] + uid;
