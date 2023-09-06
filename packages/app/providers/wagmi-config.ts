import { configureChains, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChainId } from "@stackly/sdk";

const chainJsonRpc: Record<number, { http: string }> = {
  [ChainId.GNOSIS]: {
    http: `https://rpc.gnosis.gateway.fm`,
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [gnosis],
  [
    jsonRpcProvider({
      rpc: (chain) => chainJsonRpc[chain.id],
    }),
  ]
);

export const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_KEY,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",

    appName: "Stackly",
    appDescription: "Stack crypto over time.",
    appUrl: "https://stackly.eth.limo",
    appIcon: "https://stackly.eth.limo/favicon.ico",
    chains,
    publicClient,
    webSocketPublicClient,
  })
);
