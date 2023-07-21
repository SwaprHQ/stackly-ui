"use client";

import { ConnectKitProvider } from "connectkit";
import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { config } from "./wagmi-config";
import { TokenListProvider } from "@/context/TokenListContext";
import { ModalContextProvider } from "@/context/ModalContext";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider mode="light">
        <TokenListProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </TokenListProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
