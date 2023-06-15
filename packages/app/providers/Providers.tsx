"use client";

import { ConnectKitProvider } from "connectkit";
import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi-config";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};
