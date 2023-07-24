"use client";

import { useEffect, useState } from "react";

import { Tab } from "@headlessui/react";

import { BodyText } from "@/ui";
import {
  StackOrder,
  filterActiveOrders,
  filterCompletedOrders,
} from "@/models/stack-order";
import { StacksTable } from "@/components/StacksTable";

interface StackTabsProps {
  stackOrders?: StackOrder[];
}

export const StackTabs = ({ stackOrders }: StackTabsProps) => {
  const [completedOrders, setCompletedOrders] = useState<StackOrder[]>([]);
  const [activeOrders, setActiveOrders] = useState<StackOrder[]>([]);

  useEffect(() => {
    if (stackOrders?.length) {
      setCompletedOrders(filterCompletedOrders(stackOrders));
      setActiveOrders(filterActiveOrders(stackOrders));
    }
  }, [stackOrders]);

  return (
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
            {activeOrders.length ? (
              <StacksTable stackOrders={activeOrders} />
            ) : (
              <EmptyStacks text="No active stacks" />
            )}
          </Tab.Panel>
          <Tab.Panel>
            {completedOrders?.length ? (
              <StacksTable stackOrders={completedOrders} />
            ) : (
              <EmptyStacks text="No completed stacks" />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const EmptyStacks = ({ text }: { text: string }) => (
  <div className="py-12 my-12 bg-white rounded-xl">
    <BodyText className="text-center text-em-low">{text}</BodyText>
  </div>
);
