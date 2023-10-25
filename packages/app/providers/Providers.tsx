"use client";

import { PropsWithChildren } from "react";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";

import { config } from "./wagmi-config";
import {
  AnalyticsProvider,
  ModalContextProvider,
  StrategyContextProvider,
  TokenListProvider,
} from "@/contexts";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AnalyticsProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider mode="light">
          <TokenListProvider>
            <ModalContextProvider>
              <StrategyContextProvider>{children}</StrategyContextProvider>
            </ModalContextProvider>
          </TokenListProvider>
        </ConnectKitProvider>
      </WagmiConfig>
    </AnalyticsProvider>
  );
};
