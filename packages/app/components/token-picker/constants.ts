import {
  arbitrumTokens,
  gnosisTokens,
  mainnetTokens,
  baseTokens,
  TokenFromTokenlist,
} from "@/models/token";
import { ChainId } from "@stackly/sdk";

export const TOKEN_PICKER_COMMON_TOKENS: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  [ChainId.ETHEREUM]: [
    mainnetTokens.USDC,
    mainnetTokens.WETH,
    mainnetTokens.WBTC,
    mainnetTokens.SWPR,
  ],
  [ChainId.ARBITRUM]: [
    arbitrumTokens.USDC,
    arbitrumTokens.WETH,
    arbitrumTokens.WBTC,
    arbitrumTokens.ARB,
    arbitrumTokens.SWPR,
  ],
  [ChainId.GNOSIS]: [
    gnosisTokens.GNO,
    gnosisTokens.SWPR,
    gnosisTokens.WETH,
    gnosisTokens.WXDAI,
  ],
  [ChainId.BASE]: [baseTokens.USDC, baseTokens.WETH, baseTokens.CBBTC],
};
