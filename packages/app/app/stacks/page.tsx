"use client";

import { StackOrders } from "@/app/stacks/stacksOrders";
import { useAccount, useNetwork } from "wagmi";
import NoWalletState from "./no-wallet-state";

export default function Page() {
  const { chain } = useNetwork();
  const { address, isDisconnected } = useAccount();

  if (isDisconnected) return <NoWalletState />;

  return (
    <div className="py-10 space-y-8">
      {chain && address ? (
        <StackOrders chainId={chain.id} address={address} />
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
