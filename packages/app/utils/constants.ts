import {
  arbitrumTokens,
  gnosisTokens,
  mainnetTokens,
  TokenFromTokenlist,
} from "@/models/token";
import { ChainId } from "@stackly/sdk";

interface DefaultTokens {
  from: TokenFromTokenlist;
  to: TokenFromTokenlist;
}

export const DEFAULT_TOKENS_BY_CHAIN: { [chainId: number]: DefaultTokens } = {
  [ChainId.ETHEREUM]: {
    from: mainnetTokens.USDC,
    to: mainnetTokens.WETH,
  },
  [ChainId.ARBITRUM]: {
    from: arbitrumTokens.USDC,
    to: arbitrumTokens.WETH,
  },
  [ChainId.GNOSIS]: {
    from: gnosisTokens.WXDAI,
    to: gnosisTokens.WETH,
  },
};
