import {
  GNOSIS_WETH,
  GNOSIS_WXDAI,
  MAINNET_USDC,
  MAINNET_WETH,
  TokenFromTokenlist,
} from "@/models/token";

interface DefaultTokens {
  from: TokenFromTokenlist;
  to: TokenFromTokenlist;
}

export const DEFAULT_TOKENS_BY_CHAIN: { [chainId: number]: DefaultTokens } = {
  1: {
    from: MAINNET_USDC,
    to: MAINNET_WETH,
  },
  100: {
    from: GNOSIS_WXDAI,
    to: GNOSIS_WETH,
  },
};
