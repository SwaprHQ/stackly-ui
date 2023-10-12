import {
  gnosisTokens,
  mainnetTokens,
  TokenFromTokenlist,
} from "@/models/token";

export const TOKEN_PICKER_COMMON_TOKENS: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  1: [
    mainnetTokens.USDC,
    mainnetTokens.WETH,
    mainnetTokens.WBTC,
    mainnetTokens.RETH,
  ],
  100: [
    gnosisTokens.GNO,
    gnosisTokens.SWAPR,
    gnosisTokens.WETH,
    gnosisTokens.WXDAI,
  ],
};
