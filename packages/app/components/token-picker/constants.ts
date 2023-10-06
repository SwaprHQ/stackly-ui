import {
  GNOSIS_GNO,
  GNOSIS_SWAPR,
  GNOSIS_WETH,
  GNOSIS_WXDAI,
  MAINNET_USDC,
  MAINNET_WETH,
  TokenFromTokenlist,
} from "@/models/token";

export const TOKEN_PICKER_COMMON_TOKENS: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  1: [MAINNET_USDC, MAINNET_WETH],
  100: [GNOSIS_GNO, GNOSIS_SWAPR, GNOSIS_WETH, GNOSIS_WXDAI],
};
