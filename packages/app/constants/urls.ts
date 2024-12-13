import { ChainId } from "@stackly/sdk";

// RPC endpoints
export const RPC_LIST: { [chainId: number]: string } = {
  [ChainId.ETHEREUM]: process.env.RPC_MAINNET ?? "https://eth.meowrpc.com/",
  [ChainId.GNOSIS]: process.env.RPC_GNOSIS ?? "https://rpc.gnosis.gateway.fm/",
  [ChainId.ARBITRUM]:
    process.env.RPC_ARBITRUM ?? "https://arbitrum-one-rpc.publicnode.com/",
  [ChainId.BASE]: process.env.RPC_BASE ?? "https://mainnet.base.org",
};

// App URLs
export const STACKLY_LANDING_URL =
  process.env.STACKLY_LANDING_URL ?? "https://stackly.app";

export const STACKLY_APP_URL =
  process.env.STACKLY_APP_URL ?? "https://stackly.eth.limo";
