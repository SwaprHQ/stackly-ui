import { configureChains, createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { gnosis } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [gnosis],
  [publicProvider()]
);

export const config = createConfig(
  getDefaultConfig({
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
  })
);
