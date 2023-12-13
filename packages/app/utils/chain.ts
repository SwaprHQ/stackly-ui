import { ChainId } from "@stackly/sdk";

export const getIsValidChainId = (newChainId: number): Boolean =>
  Object.values(ChainId).some((chainId) => chainId === newChainId);
