import { ChainId } from "@stackly/sdk";
import { createConfig, fallback, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis, mainnet, arbitrum, base } from "wagmi/chains";
import { safe } from "wagmi/connectors";

import { RPC_LIST } from "@/constants";

const defaultConfig = getDefaultConfig({
  chains: [gnosis, mainnet, arbitrum, base],
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  transports: {
    [mainnet.id]: fallback([http(RPC_LIST[ChainId.ETHEREUM]), http()]),
    [gnosis.id]: fallback([http(RPC_LIST[ChainId.GNOSIS]), http()]),
    [arbitrum.id]: fallback([http(RPC_LIST[ChainId.ARBITRUM]), http()]),
    [base.id]: fallback([http(RPC_LIST[ChainId.BASE]), http()]),
  },
  appName: "Stackly",
  appDescription: "Empower your portfolio with DCA.",
  appUrl: "https://stackly.app",
  appIcon: "https://stackly.app/favicon.ico",
  ssr: true,
});

const safeConnector = safe({
  allowedDomains: [/app.safe.global$/],
  debug: false,
});

export const config = createConfig({
  ...defaultConfig,
  connectors: defaultConfig.connectors
    ? defaultConfig.connectors
    : [safeConnector],
});
