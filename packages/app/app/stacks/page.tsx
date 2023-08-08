"use client";

import { StackOrders } from "@/app/stacks/stacks-orders";
import { useAccount, useNetwork } from "wagmi";
import NoWalletState from "./no-wallet-state";
import { ButtonLink, HeadingText } from "@/ui";

export default function Page() {
  const { chain } = useNetwork();
  const { address, isDisconnected } = useAccount();

  if (isDisconnected) return <NoWalletState />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <HeadingText size={3}>Your stacks</HeadingText>
        <ButtonLink
          iconLeft="plus"
          href="/"
          width="fit"
          size="sm"
          className="hidden sm:flex"
        >
          Create New Stack
        </ButtonLink>
      </div>
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
