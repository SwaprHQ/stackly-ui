"use client";

import { PropsWithChildren } from "react";

import { ConnectKitProvider } from "connectkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./wagmi-config";
import {
  ModalContextProvider,
  NetworkContextProvider,
  StackboxFormContextProvider,
  StrategyContextProvider,
  TokenListProvider,
} from "@/contexts";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          mode="light"
          options={{ initialChainId: 0, enforceSupportedChains: true }}
        >
          <NetworkContextProvider>
            <TokenListProvider>
              <ModalContextProvider>
                <StrategyContextProvider>
                  <StackboxFormContextProvider>
                    {children}
                  </StackboxFormContextProvider>
                </StrategyContextProvider>
              </ModalContextProvider>
            </TokenListProvider>
          </NetworkContextProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
