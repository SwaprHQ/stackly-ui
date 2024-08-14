"use client";

import { useAccount } from "wagmi";

import { ChainId } from "@stackly/sdk";

import { StackOrders } from "@/app/stacks/stacksOrders";
import { useNetworkContext } from "@/contexts";

import NoWalletState from "./no-wallet-state";

export default function Page() {
  const { chainId: contextChainId } = useNetworkContext();
  const { address, chainId: wagmiChainId, isDisconnected } = useAccount();

  const chainId = isDisconnected
    ? contextChainId
    : wagmiChainId ?? ChainId.ARBITRUM;

  if (isDisconnected) return <NoWalletState />;

  return (
    <div className="space-y-8">
      {chainId && address ? (
        <StackOrders chainId={chainId} address={address} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

const Loading = () => (
  <div className="space-y-6">
    <div className="h-12 rounded-lg bg-surface-50 animate-pulse"></div>
    <div className="h-32 rounded-lg bg-surface-50 animate-pulse"></div>
  </div>
);
