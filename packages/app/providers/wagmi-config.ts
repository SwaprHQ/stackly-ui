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
