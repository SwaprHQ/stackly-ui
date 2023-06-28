"use client";

import { Tab } from "@headlessui/react";
import { EmptyState } from "@/app/stacks/empty-state";
import { ButtonLink, HeadingText } from "@/ui";
import { StacksTable } from "@/components/StacksTable";
import {
  filterActiveOrders,
  filterCompletedOrders,
  getOrders,
} from "@/models/order";
import { getStackOrders } from "@/models/stack-order";

export default async function Page() {
  const mockOrders = await getOrders("0x...."); // todo: change to connected wallet address
  const stackOrders = await getStackOrders(mockOrders);

  if (!mockOrders) return <EmptyState />;

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
              <StacksTable orders={filterActiveOrders(stackOrders)} />
            </Tab.Panel>
            <Tab.Panel>
              <StacksTable orders={filterCompletedOrders(stackOrders)} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
