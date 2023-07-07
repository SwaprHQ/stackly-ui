"use client";

import { Tab } from "@headlessui/react";
import { EmptyState } from "@/app/stacks/empty-state";
import { BodyText, ButtonLink, HeadingText } from "@/ui";
import { StacksTable } from "@/components/StacksTable";
import { getOrders } from "@/models/order";
import {
  filterActiveOrders,
  filterCompletedOrders,
  getStackOrders
} from "@/models/stack-order";

export default async function Page() {
  const chainId = 100; // will be replaced with useNetwork chain when sdk

  const mockOrders = await getOrders("address");
  if (!mockOrders) return <EmptyState />;
  const stackOrders = await getStackOrders(chainId, mockOrders);

  const completedOrders = filterCompletedOrders(stackOrders);
  const hasCompletedOrders = completedOrders.length > 0;
  const activeOrders = filterActiveOrders(stackOrders);
  const hasActiveOrders = activeOrders.length > 0;

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
              {hasActiveOrders ? (
                <StacksTable stackOrders={activeOrders} />
              ) : (
                <EmptyStacks text=" No active stacks" />
              )}
            </Tab.Panel>
            <Tab.Panel>
              {hasCompletedOrders ? (
                <StacksTable stackOrders={completedOrders} />
              ) : (
                <EmptyStacks text="No completed stacks" />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

const EmptyStacks = ({ text }: { text: string }) => (
  <div className="py-12 my-12 bg-white rounded-xl">
    <BodyText className="text-center text-em-low">{text}</BodyText>
  </div>
);
