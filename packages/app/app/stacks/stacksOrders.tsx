"use client";

import { useCallback, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";

import { StackOrder, getStackOrders } from "@/models/stack-order";
import {
  getActiveOrders,
  getCancelledOrders,
  getCompleteOrders,
} from "@/models/order";
import { ChainId } from "@stackly/sdk";
import { ButtonLink, HeadingText } from "@/ui";
import { EmptyState, StacksTable, tabButtonStyles } from "@/components";
import EmptyStatePage from "./empty-state";
import { currentTimestampInSeconds } from "@/utils";

type SortTime = "startTime" | "endTime" | "cancelledAt";

const sortedOrdersByTime = (orders: StackOrder[], time: SortTime) =>
  orders.sort((a, b) => Number(b[time]) - Number(a[time]));

interface OrderByState {
  orders: StackOrder[];
  emptyText: string;
  sort: SortTime;
  fetcher: (
    chainId: ChainId,
    address: string,
    currentTimestamp: number,
    skip?: number | undefined,
    first?: number | undefined
  ) => Promise<any>;
}

export interface StackOrdersProps {
  address: string;
  chainId: ChainId;
}

type StackStateIndex = 0 | 1 | 2;

export const StackOrders = ({ chainId, address }: StackOrdersProps) => {
  const [loading, setLoading] = useState(true);
  const [stackStateIndex, setStackStateIndex] = useState<StackStateIndex>(0);
  const [currentStackOrders, setCurrentStackOrders] = useState<StackOrder[]>(
    []
  );

  const ordersByState: OrderByState[] = [
    {
      orders: currentStackOrders,
      emptyText: "No active stacks",
      sort: "startTime",
      fetcher: getActiveOrders,
    },
    {
      orders: currentStackOrders,
      emptyText: "No complete stacks",
      sort: "endTime",
      fetcher: getCompleteOrders,
    },
    {
      orders: currentStackOrders,
      emptyText: "No cancelled stacks",
      sort: "cancelledAt",
      fetcher: getCancelledOrders,
    },
  ];

  const fetchStacks = useCallback(
    (stackStateIndex: StackStateIndex) => {
      ordersByState[stackStateIndex]
        .fetcher(chainId, address.toLowerCase(), currentTimestampInSeconds)
        .then(async (orders) => {
          if (!orders || orders.length === 0) setCurrentStackOrders([]);
          else {
            const stackOrders = await getStackOrders(chainId, orders);
            if (stackOrders.length > 0) setCurrentStackOrders(stackOrders);
          }
        })
        .finally(() => setLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [address, chainId]
  );

  useEffect(() => fetchStacks(stackStateIndex), [fetchStacks, stackStateIndex]);

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
        <Tab.Group
          onChange={(index) => {
            setStackStateIndex(index as StackStateIndex);
          }}
        >
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
                {ordersByState.map((stacks, index) => (
                  <Tab.Panel key={stacks.emptyText}>
                    {stacks.orders.length ? (
                      <StacksTable
                        stackOrders={sortedOrdersByTime(
                          stacks.orders,
                          stacks.sort
                        )}
                        refetchStacks={() =>
                          fetchStacks(index as StackStateIndex)
                        }
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
