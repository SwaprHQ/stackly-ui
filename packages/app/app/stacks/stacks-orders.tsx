// @ts-nocheck
"use client";

import {
  filterActiveOrders,
  filterCompletedOrders,
  getStackOrders,
} from "@/models/stack-order";
import { Tab } from "@headlessui/react";
import { BodyText, ButtonLink, HeadingText } from "@/ui";
import { StacksTable } from "@/components/StacksTable";
import { EmptyState } from "@/app/stacks/empty-state";
import { getOrders } from "@/models/order";
import { ChainId } from "@stackly/sdk";
import { useEffect, useState } from "react";

export interface StackOrdersProps {
  address: string;
  chainId: ChainId;
}

export const StackOrders = ({ chainId, address }: StackOrdersProps) => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentStackOrders, setCurrentStackOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orders = await getOrders(chainId, address.toLowerCase());
      if (orders) setCurrentOrders(orders);
    }
    fetchData();
  }, [address, chainId]);

  useEffect(() => {
    async function fetchData() {
      const stackOrders = await getStackOrders(chainId, currentOrders);
      if (stackOrders) setCurrentStackOrders(stackOrders);
    }
    fetchData();
  }, [currentOrders]);

  if (currentOrders.length === 0) return <EmptyState />;

  const completedOrders = filterCompletedOrders(currentStackOrders);
  const hasCompletedOrders = completedOrders.length > 0;
  const activeOrders = filterActiveOrders(currentStackOrders);
  const hasActiveOrders = activeOrders.length > 0;

  return (
    <>
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
    </>
  );
};

const EmptyStacks = ({ text }: { text: string }) => (
  <div className="py-12 bg-white rounded-xl">
    <BodyText className="text-center text-em-low">{text}</BodyText>
  </div>
);
