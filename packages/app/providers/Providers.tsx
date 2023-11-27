"use client";

import { PropsWithChildren } from "react";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";

import { config } from "./wagmi-config";
import {
  ModalContextProvider,
  StackboxFormContextProvider,
  StrategyContextProvider,
  TokenListProvider,
} from "@/contexts";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">
        <ModalContextProvider>
          <StrategyContextProvider>
            <StackboxFormContextProvider>
              <TokenListProvider>{children}</TokenListProvider>
            </StackboxFormContextProvider>
          </StrategyContextProvider>
        </ModalContextProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
