import { ChainId } from "@stackly/sdk";
import { createConfig, fallback, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis, mainnet } from "wagmi/chains";
import { safe } from "wagmi/connectors";

import { RPC_LIST } from "@/constants";

const chainJsonRpc: Record<number, { http: string }> = {
  [ChainId.GNOSIS]: {
    http: RPC_LIST[ChainId.GNOSIS],
  },
  [ChainId.ETHEREUM]: {
    http: RPC_LIST[ChainId.ETHEREUM],
  },
};

const defaultConfig = getDefaultConfig({
  chains: [gnosis, mainnet],
  walletConnectProjectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  transports: {
    [mainnet.id]: fallback([http(RPC_LIST[ChainId.ETHEREUM]), http()]),
    [gnosis.id]: fallback([http(RPC_LIST[ChainId.GNOSIS]), http()]),
  },
  appName: "Stackly",
  appDescription: "Stack crypto over time.",
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
