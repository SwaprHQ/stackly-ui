"use client";

import { PropsWithChildren, createContext } from "react";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";

import { config } from "./wagmi-config";
import { ModalContextProvider, TokenListProvider } from "@/contexts";
import { AnalyticsProvider } from "./analytics";
import { Web3AuthProvider } from "./web3auth";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Web3AuthProvider>
      <AnalyticsProvider>
        <WagmiConfig config={config}>
          <ConnectKitProvider mode="light">
            <TokenListProvider>
              <ModalContextProvider>{children}</ModalContextProvider>
            </TokenListProvider>
          </ConnectKitProvider>
        </WagmiConfig>
      </AnalyticsProvider>
    </Web3AuthProvider>
  );
};
