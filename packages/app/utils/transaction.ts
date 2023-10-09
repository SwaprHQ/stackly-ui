import { ChainId } from "@stackly/sdk";

const EXPLORER_URL_BY_CHAIN = {
  1: "https://etherscan.io",
  100: "https://gnosisscan.io",
};

export const txEplorerLink = (chainId: ChainId, txHash: string) => {
  const baseUrl = EXPLORER_URL_BY_CHAIN[chainId];

  return `${baseUrl}/tx/${txHash}`;
};
