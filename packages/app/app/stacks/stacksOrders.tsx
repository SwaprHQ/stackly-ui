"use client";

import { useCallback, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

import {
  StackOrder,
  filterActiveOrders,
  filterCancelledOrders,
  filterCompletedOrders,
  getStackOrders,
} from "@/models/stack-order";
import { getOrders } from "@/models/order";
import { ChainId } from "@stackly/sdk";
import { ButtonLink, HeadingText } from "@/ui";
import { EmptyState, StacksTable, tabButtonStyles } from "@/components";
import EmptyStatePage from "./empty-state";

export interface StackOrdersProps {
  address: string;
  chainId: ChainId;
}

export const StackOrders = ({ chainId, address }: StackOrdersProps) => {
  const [loading, setLoading] = useState(true);
  const [currentStackOrders, setCurrentStackOrders] = useState<StackOrder[]>(
    []
  );

  const ordersByType = [
    {
      orders: filterActiveOrders(currentStackOrders),
      emptyText: "No active stacks",
    },
    {
      orders: filterCompletedOrders(currentStackOrders),
      emptyText: "No complete stacks",
    },
    {
      orders: filterCancelledOrders(currentStackOrders),
      emptyText: "No cancelled stacks",
    },
  ];

  const fetchStacks = useCallback(() => {
    getOrders(chainId, address.toLowerCase())
      .then(async (orders) => {
        if (!orders || orders.length === 0) setCurrentStackOrders([]);
        else {
          const stackOrders = await getStackOrders(chainId, orders);
          if (stackOrders.length > 0) setCurrentStackOrders(stackOrders);
        }
      })
      .finally(() => setLoading(false));
  }, [address, chainId]);

  useEffect(() => fetchStacks(), [fetchStacks]);

  if (!loading && currentStackOrders.length === 0) return <EmptyStatePage />;

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingText size={3}>Your stacks</HeadingText>
        <ButtonLink iconLeft="plus" href="/" className="hidden sm:flex">
          Create New Stack
        </ButtonLink>
      </div>
      <div className="space-y-6">
        <Tab.Group>
          <Tab.List>
            <div className="flex space-x-2">
              <Tab as="button" className={tabButtonStyles}>
                Active
              </Tab>
              <Tab as="button" className={tabButtonStyles}>
                Completed
              </Tab>
              <Tab as="button" className={tabButtonStyles}>
                Cancelled
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            {loading ? (
              <EmptyState className="animate-pulse" text="Loading..." />
            ) : (
              <>
                {ordersByType.map((stacks) => (
                  <Tab.Panel key={stacks.emptyText}>
                    {stacks.orders.length ? (
                      <StacksTable
                        stackOrders={stacks.orders}
                        refetchStacks={fetchStacks}
                      />
                    ) : (
                      <EmptyState text={stacks.emptyText} />
                    )}
                  </Tab.Panel>
                ))}
              </>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};
