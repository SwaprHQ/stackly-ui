"use client";

import { Tab } from "@headlessui/react";
import { EmptyState } from "@/app/stacks/empty-state";
import { ButtonLink, HeadingText } from "@/ui";
import { StacksTable } from "@/components/StacksTable";
import { currentTimestampInSeconds } from "@/utils/datetime";
import { Order } from "@/models/order";

const mockData = {
  orders: [
    {
      id: "0x68b57d8b652aee685c6b8c387616911eca5ed883",
      owner: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      receiver: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      amount: "82703877979230235735",
      sellToken: {
        id: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
        decimals: 18,
        name: "Wrapped XDAI",
        symbol: "WXDAI",
      },
      buyToken: {
        id: "0x177127622c4a00f3d409b75571e12cb3c8973d3c",
        decimals: 18,
        name: "CoW Protocol Token from Mainnet",
        symbol: "COW",
      },
      createdAt: "1685623740",
      startTime: 1685641620,
      endTime: 1688834820,
      orderSlots: [
        "1685641620",
        "1686246420",
        "1686851220",
        "1687456020",
        "1688060820",
        "1688665620",
      ],
      cancelledAt: null,
      interval: "168",
    },
    {
      id: "0x71b3a51be759547c5b2887a8a6e19c68ae3b3244",
      owner: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      receiver: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      amount: "419790000000000000000",
      sellToken: {
        id: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
        decimals: 18,
        name: "Wrapped XDAI",
        symbol: "WXDAI",
      },
      buyToken: {
        id: "0x9c58bacc331c9aa871afd802db6379a98e80cedb",
        decimals: 18,
        name: "Gnosis Token on xDai",
        symbol: "GNO",
      },
      createdAt: "1685616055",
      startTime: 1693581600,
      endTime: 1698420000,
      orderSlots: [
        "1693581600",
        "1694186400",
        "1694791200",
        "1695396000",
        "1696000800",
        "1696605600",
        "1697210400",
        "1697815200",
      ],
      cancelledAt: "1685620710",
      interval: "168",
    },
    {
      id: "0x9a4b6a475370bb4f21c13fff7f54514751f24477",
      owner: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      receiver: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      amount: "1999000000000000000",
      sellToken: {
        id: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
        decimals: 18,
        name: "Wrapped XDAI",
        symbol: "WXDAI",
      },
      buyToken: {
        id: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
        decimals: 18,
        name: "Wrapped Ether on xDai",
        symbol: "WETH",
      },
      createdAt: "1683890840",
      startTime: 1683891419,
      endTime: 1684495531,
      orderSlots: [
        "1683891419",
        "1683977819",
        "1684064219",
        "1684150619",
        "1684237019",
        "1684323419",
        "1684409819",
      ],
      cancelledAt: null,
      interval: "24",
    },
    {
      id: "0xc47bc680c00bc1620b0de3a638c565691cb616e8",
      owner: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      receiver: "0x05a4ed2367bd2f0aa63cc14897850be7474bc722",
      amount: "419790000000000000000",
      sellToken: {
        id: "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d",
        decimals: 18,
        name: "Wrapped XDAI",
        symbol: "WXDAI",
      },
      buyToken: {
        id: "0x9c58bacc331c9aa871afd802db6379a98e80cedb",
        decimals: 18,
        name: "Gnosis Token on xDai",
        symbol: "GNO",
      },
      createdAt: "1685621305",
      startTime: 1685621892,
      endTime: 1693581600,
      orderSlots: [
        "1685621892",
        "1686226692",
        "1686831492",
        "1687436292",
        "1688041092",
        "1688645892",
        "1689250692",
        "1689855492",
        "1690460292",
        "1691065092",
        "1691669892",
        "1692274692",
        "1692879492",
        "1693484292",
      ],
      cancelledAt: null,
      interval: "168",
    },
  ],
};

const completedOrders = (orders: Order[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) < currentTimestampInSeconds &&
      order.cancelledAt === null
  );

const activeOrders = (orders: Order[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) > currentTimestampInSeconds &&
      order.cancelledAt === null
  );

export default function Page() {
  const data = mockData;

  if (!data) return <EmptyState />;

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
              <StacksTable orders={activeOrders(data.orders)} />
            </Tab.Panel>
            <Tab.Panel>
              <StacksTable orders={completedOrders(data.orders)} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
