"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "class-variance-authority";
import { Tab } from "@headlessui/react";
import {
  StackOrder,
  filterActiveOrders,
  filterCancelledOrders,
  filterCompletedOrders,
  getStackOrders,
} from "@/models/stack-order";
import { ChainId } from "@stackly/sdk";
import { BodyText, ButtonLink, HeadingText, buttonStyles } from "@/ui";
import { StacksTable } from "@/components";
import EmptyState from "./empty-state";
import { getOrders } from "@/models/order";
import { twMerge } from "tailwind-merge";

export interface StackOrdersProps {
  address: string;
  chainId: ChainId;
}

const tabButtonStyles = twMerge(
  buttonStyles({ variant: "secondary" }),
  "bg-transperant border border-transparent text-em-high font-semibold ui-selected:bg-surface-75 ui-not-selected:text-em-low  hover:bg-surface-50 hover:border-surface-75 focus:ring-0"
);

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
        if (!orders || orders.length === 0) return;

        const stackOrders = await getStackOrders(chainId, orders);
        if (stackOrders.length > 0) setCurrentStackOrders(stackOrders);
      })
      .finally(() => setLoading(false));
  }, [address, chainId]);

  useEffect(() => fetchStacks(), [fetchStacks]);

  if (!loading && currentStackOrders.length === 0) return <EmptyState />;

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
              <EmptyStacks className="animate-pulse" text="Loading..." />
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
                      <EmptyStacks text={stacks.emptyText} />
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

const EmptyStacks = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <div className="py-12 bg-white rounded-xl">
    <BodyText className={cx("text-center text-em-low", className)}>
      {text}
    </BodyText>
  </div>
);
