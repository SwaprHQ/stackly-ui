"use client";

import { StackOrders } from "@/app/stacks/stacks-orders";
import { ChainId } from "@stackly/sdk";
import { useAccount, useNetwork } from "wagmi";
import { NoWalletState } from "@/app/stacks/no-wallet-state";

export default function Page() {
  const { chain } = useNetwork();
  const chainId: ChainId = chain ? chain.id : 100;
  const { address } = useAccount();

  if (!address) return <NoWalletState />;

  return (
    <div className="space-y-8">
      <StackOrders chainId={chainId} address={address} />
    </div>
  );
}
