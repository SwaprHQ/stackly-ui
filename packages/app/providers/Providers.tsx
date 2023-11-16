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
        <TokenListProvider>
          <ModalContextProvider>
            <StrategyContextProvider>
              <StackboxFormContextProvider>
                {children}
              </StackboxFormContextProvider>
            </StrategyContextProvider>
          </ModalContextProvider>
        </TokenListProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
