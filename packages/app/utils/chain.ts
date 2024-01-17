import { ChainId } from "@stackly/sdk";

export const checkIsValidChainId = (newChainId: number): Boolean =>
  Object.values(ChainId).some((chainId) => chainId === newChainId);
