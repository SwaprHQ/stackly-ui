import { configureChains, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { ChainId } from "@stackly/sdk";
import { SafeConnector } from "wagmi/connectors/safe";

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

const defaultConfig = getDefaultConfig({
  autoConnect: false,
  alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

  appName: "Stackly",
  appDescription: "Stack crypto over time.",
  appUrl: "https://stackly.app",
  appIcon: "https://stackly.app/favicon.ico",
  chains,
  publicClient,
  webSocketPublicClient,
});

const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/app.safe.global$/],
    debug: false,
  },
});

export const config = createConfig({
  ...defaultConfig,
  connectors: defaultConfig.connectors
    ? [...defaultConfig.connectors, safeConnector]
    : [safeConnector],
});
