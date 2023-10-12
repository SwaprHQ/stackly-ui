import {
  gnosisTokens,
  mainnetTokens,
  TokenFromTokenlist,
} from "@/models/token";

interface DefaultTokens {
  from: TokenFromTokenlist;
  to: TokenFromTokenlist;
}

export const DEFAULT_TOKENS_BY_CHAIN: { [chainId: number]: DefaultTokens } = {
  1: {
    from: mainnetTokens.USDC,
    to: mainnetTokens.WETH,
  },
  100: {
    from: gnosisTokens.WXDAI,
    to: gnosisTokens.WETH,
  },
};
