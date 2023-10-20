"use client";

import { PropsWithChildren } from "react";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";

import { config } from "./wagmi-config";
import {
  ModalContextProvider,
  StrategyContextProvider,
  TokenListProvider,
} from "@/contexts";
import { AnalyticsProvider } from "./analytics";

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
