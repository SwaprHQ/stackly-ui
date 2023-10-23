import {
  gnosisTokens,
  mainnetTokens,
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
    mainnetTokens.RETH,
  ],
  [ChainId.GNOSIS]: [
    gnosisTokens.GNO,
    gnosisTokens.SWAPR,
    gnosisTokens.WETH,
    gnosisTokens.WXDAI,
  ],
};
