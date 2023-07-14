"use client";

import { EmptyState } from "@/app/stacks/empty-state";
import { NoWalletState } from "@/app/stacks/no-wallet-state";
import { useAccount } from "wagmi";

export default function Page() {
  const { address } = useAccount();
  if (!address) return <NoWalletState />;

  return <EmptyState />;
}
