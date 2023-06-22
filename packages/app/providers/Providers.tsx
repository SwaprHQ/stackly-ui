"use client";

import { ConnectKitProvider } from "connectkit";
import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi-config";
import { TokenListProvider } from "@/context/TokenListContext";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">
        <TokenListProvider>{children}</TokenListProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
