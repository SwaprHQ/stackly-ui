"use client";

import { Tab } from "@headlessui/react";
import { EmptyState } from "@/app/stacks/empty-state";
import { ButtonLink, HeadingText } from "@/ui";
import { StacksTable } from "@/components/StacksTable";
import { getOrders } from "@/models/order";
import {
  filterActiveOrders,
  filterCompletedOrders,
  getStackOrders,
} from "@/models/stack-order";
// import { useAccount } from "wagmi";
// import { NoWalletState } from "@/app/stacks/no-wallet-state";

export default async function Page() {
  console.log("====== Stacks Page ======");
  // will be uncommented when we add SDK
  // const { address } = useAccount();
  // if (!address) return <NoWalletState />;

  const mockOrders = await getOrders("address");
  if (!mockOrders) return <EmptyState />;

  const stackOrders = await getStackOrders(mockOrders);

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
      <div className="space-y-6">
        <Tab.Group>
          <Tab.List>
            <div className="flex space-x-2">
              <Tab
                as="button"
                className="px-3 py-1.5 font-semibold rounded-lg ui-selected:bg-surface-75 ui-not-selected:text-em-low outline-none active:ring-2 active:ring-gray-100"
              >
                Active Stacks
              </Tab>
              <Tab
                as="button"
                className="px-3 py-1.5 font-semibold rounded-lg ui-selected:bg-surface-75 ui-not-selected:text-em-low outline-none active:ring-2 active:ring-gray-100"
              >
                Completed stacks
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {stackOrders && (
                <StacksTable stackOrders={filterActiveOrders(stackOrders)} />
              )}
            </Tab.Panel>
            <Tab.Panel>
              {stackOrders && (
                <StacksTable stackOrders={filterCompletedOrders(stackOrders)} />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
