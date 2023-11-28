import { ChainId } from "@stackly/sdk";

export const getIsValidChainId = (newChainId: number) =>
  Object.values(ChainId).some((chainId) => chainId === newChainId);
