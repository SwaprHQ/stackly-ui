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
import {
  getActiveOrders,
  getCancelledOrders,
  getCompleteOrders,
  getOrders,
} from "@/models/order";
import { ChainId, Order } from "@stackly/sdk";
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
  numberOfPages: number;
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

const ITEMS_PER_PAGE = 10;

export const StackOrders = ({ chainId, address }: StackOrdersProps) => {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stackStateIndex, setStackStateIndex] = useState<StackStateIndex>(0);
  const [currentStackOrders, setCurrentStackOrders] = useState<StackOrder[]>(
    []
  );

  const totalStacksNumber = allOrders.length;

  const totalStacksActive = filterActiveOrders(allOrders).length;
  const stackActiveTotalPages =
    totalStacksActive > ITEMS_PER_PAGE ? totalStacksActive / ITEMS_PER_PAGE : 1;

  const totalStacksComplete = filterCompletedOrders(allOrders).length;
  const stackCompletedTotalPages =
    totalStacksComplete > ITEMS_PER_PAGE
      ? totalStacksComplete / ITEMS_PER_PAGE
      : 1;

  const totalStacksCancelled = filterCancelledOrders(allOrders).length;
  const stackCancelledTotalPages =
    totalStacksCancelled > ITEMS_PER_PAGE
      ? totalStacksCancelled / ITEMS_PER_PAGE
      : 1;

  const skipItems = (currentPage - 1) * ITEMS_PER_PAGE;

  const hasMorePages = (numberOfPages: number) => numberOfPages > currentPage;
  const hasLessPages = currentPage > 1;

  const nextPage = (numberOfPages: number) => {
    if (hasMorePages(numberOfPages)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (hasLessPages) {
      setCurrentPage(currentPage - 1);
    }
  };

  const ordersByState: OrderByState[] = [
    {
      orders: currentStackOrders,
      emptyText: "No active stacks",
      sort: "startTime",
      fetcher: getActiveOrders,
      numberOfPages: stackActiveTotalPages,
    },
    {
      orders: currentStackOrders,
      emptyText: "No complete stacks",
      sort: "endTime",
      fetcher: getCompleteOrders,
      numberOfPages: stackCompletedTotalPages,
    },
    {
      orders: currentStackOrders,
      emptyText: "No cancelled stacks",
      sort: "cancelledAt",
      fetcher: getCancelledOrders,
      numberOfPages: stackCancelledTotalPages,
    },
  ];

  const fetchAllOrders = useCallback(() => {
    getOrders(chainId, address.toLowerCase()).then(async (orders) => {
      if (!orders || orders.length === 0) setAllOrders([]);
      else {
        setAllOrders(orders);
      }
    });
  }, [address, chainId]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const fetchStacks = useCallback(
    (stackStateIndex: StackStateIndex) => {
      ordersByState[stackStateIndex]
        .fetcher(
          chainId,
          address.toLowerCase(),
          currentTimestampInSeconds,
          skipItems,
          ITEMS_PER_PAGE
        )
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
    [address, chainId, currentPage]
  );

  useEffect(() => fetchStacks(stackStateIndex), [fetchStacks, stackStateIndex]);

  if (!loading && allOrders.length === 0) return <EmptyStatePage />;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <HeadingText size={3}>Your stacks</HeadingText>
          <div className="px-2 py-1 text-xs font-semibold bg-surface-75 rounded-xl">
            {totalStacksNumber}
          </div>
        </div>
        <ButtonLink iconLeft="plus" href="/" className="hidden sm:flex">
          Create New Stack
        </ButtonLink>
      </div>
      <div className="space-y-6">
        <Tab.Group
          onChange={(index) => {
            setStackStateIndex(index as StackStateIndex);
            setCurrentPage(1);
          }}
        >
          <Tab.List>
            <div className="flex space-x-2">
              <Tab as="button" className={tabButtonStyles}>
                Active <span className="ml-1 text-xs">{totalStacksActive}</span>
              </Tab>
              <Tab as="button" className={tabButtonStyles}>
                Completed{" "}
                <span className="ml-1 text-xs">{totalStacksComplete}</span>
              </Tab>
              <Tab as="button" className={tabButtonStyles}>
                Cancelled{" "}
                <span className="ml-1 text-xs">{totalStacksCancelled}</span>
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
                        hasMorePages={hasMorePages(stacks.numberOfPages)}
                        hasLessPages={hasLessPages}
                        nextPage={() => nextPage(stacks.numberOfPages)}
                        previousPage={previousPage}
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
