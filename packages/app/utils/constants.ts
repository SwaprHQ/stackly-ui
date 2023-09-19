import { TokenFromTokenlist } from "@/models/token";

export const MAINNET_USDC_TOKEN = {
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  name: "USD Coin",
  symbol: "USDC",
  decimals: 6,
  logoURI: "/assets/images/tokens/usdc.png",
  chainId: 1,
};

export const MAINNET_ETH_TOKEN = {
  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  name: "Wrapped ETH (WETH)",
  symbol: "WETH",
  decimals: 18,
  logoURI: "/assets/images/tokens/weth.png",
  chainId: 1,
};

export const GNOSIS_WXDAI_TOKEN = {
  address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
  name: "Wrapped XDAI",
  symbol: "WXDAI",
  decimals: 18,
  logoURI: "/assets/images/tokens/wxdai.png",
  chainId: 100,
};

export const GNOSIS_WETH_TOKEN = {
  address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
  name: "Wrapped Ether on Gnosis chain",
  symbol: "WETH",
  decimals: 18,
  logoURI: "/assets/images/tokens/weth.png",
  chainId: 100,
};

interface DefaultTokens {
  from: TokenFromTokenlist;
  to: TokenFromTokenlist;
}

export const DEFAULT_TOKENS_BY_CHAIN: { [chainId: number]: DefaultTokens } = {
  1: {
    from: MAINNET_USDC_TOKEN,
    to: MAINNET_ETH_TOKEN,
  },
  100: {
    from: GNOSIS_WXDAI_TOKEN,
    to: GNOSIS_WETH_TOKEN,
  },
};
