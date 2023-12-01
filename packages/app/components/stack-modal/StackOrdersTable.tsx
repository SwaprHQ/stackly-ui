import { useState } from "react";

import Link from "next/link";
import { Order as CowOrder, OrderStatus } from "@cowprotocol/cow-sdk";

import {
  addressShortner,
  capitalize,
  convertedAmount,
  formatDate,
} from "@/utils";
import {
  BodyText,
  Icon,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import {
  cowExplorerUrl,
  orderPairSymbolsText,
  StackOrder,
  StackOrderProps,
} from "@/models";
import { useNetworkContext } from "@/contexts";

const INITIAL_NUMBER_OF_COW_ORDERS = 8;
const MORE_ORDERS_NUMBER = 4;

export const StackOrdersTable = ({ stackOrder }: StackOrderProps) => {
  const initialCowOrders =
    stackOrder?.cowOrders?.slice(0, INITIAL_NUMBER_OF_COW_ORDERS) ?? [];

  const [cowOrders, setCowOrders] = useState<CowOrder[]>(initialCowOrders);

  const addMoreOrders = () =>
    setCowOrders(
      stackOrder.cowOrders.slice(0, cowOrders.length + MORE_ORDERS_NUMBER)
    );

  const hasMoreOrders = stackOrder?.cowOrders?.length > cowOrders.length;

  return (
    <div className="border border-surface-75 rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-1 md:table-cell">
              <BodyText size={1}>Transaction</BodyText>
            </TableHead>
            <TableHead>
              <BodyText size={1}>Time</BodyText>
            </TableHead>
            <TableHead className="py-1 text-right">
              <BodyText size={1}> {stackOrder.sellToken.symbol} spent</BodyText>
            </TableHead>
            <TableHead className="py-1 text-right">
              <BodyText size={1}>{stackOrder.buyToken.symbol} bought</BodyText>
            </TableHead>
            <TableHead className="hidden py-1 text-right md:table-cell">
              <BodyText size={1}>{orderPairSymbolsText(stackOrder)}</BodyText>
            </TableHead>
          </TableRow>
        </TableHeader>
        {cowOrders.length > 0 ? (
          <>
            <TableCowBody stackOrder={stackOrder} cowOrders={cowOrders} />
            {hasMoreOrders && (
              <TableCaption className="pb-2 mt-2">
                <div
                  className="text-sm cursor-pointer text-primary-700 hover:underline hover:underline-offset-2"
                  onClick={addMoreOrders}
                >
                  Show more orders
                </div>
              </TableCaption>
            )}
          </>
        ) : (
          <FailedToFetchCowData />
        )}
      </Table>
    </div>
  );
};

const TableCowBody = ({
  stackOrder,
  cowOrders,
}: {
  stackOrder: StackOrder;
  cowOrders: CowOrder[];
}) => {
  const { chainId } = useNetworkContext();

  const renderOrderStatus = (orderStatus: OrderStatus, price?: number) => {
    switch (orderStatus) {
      case "fulfilled":
        return (
          <BodyText className="text-em-med" size={1}>
            {price?.toFixed(4)}
          </BodyText>
        );
      case "cancelled":
      case "expired":
      case "presignaturePending":
        return (
          <BodyText className="text-em-med" size={1}>
            {capitalize(orderStatus)}
          </BodyText>
        );
      case "open":
        return (
          <BodyText className="text-em-med" size={1}>
            in progress
          </BodyText>
        );
    }
  };

  return (
    <TableBody>
      {cowOrders.map((cowOrder) => {
        const executedBuyAmount = convertedAmount(
          cowOrder.executedBuyAmount,
          stackOrder.buyToken.decimals
        );
        const executedSellAmount = convertedAmount(
          cowOrder.executedSellAmount,
          stackOrder.sellToken.decimals
        );
        const averagePrice = executedSellAmount / executedBuyAmount;

        return (
          <TableRow key={cowOrder.uid}>
            <TableCell className="py-2 md:table-cell">
              <BodyText
                size={1}
                className="text-primary-700 hover:underline hover:underline-offset-2"
              >
                <Link
                  target="_blank"
                  href={cowExplorerUrl(chainId, cowOrder.uid)}
                >
                  {addressShortner(cowOrder.uid)}
                </Link>
              </BodyText>
            </TableCell>
            <TableCell className="py-2">
              <BodyText className="text-em-med" size={1}>
                {formatDate(cowOrder.creationDate)}
              </BodyText>
            </TableCell>
            <TableCell className="py-2 text-right ">
              <BodyText className="text-em-med" size={1}>
                {executedSellAmount.toFixed(4)}
              </BodyText>
            </TableCell>
            <TableCell className="py-2 text-right ">
              <BodyText className="text-em-med" size={1}>
                {executedBuyAmount.toFixed(4)}
              </BodyText>
            </TableCell>
            <TableCell className="hidden py-2 text-right md:table-cell">
              {renderOrderStatus(cowOrder.status, averagePrice)}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const FailedToFetchCowData = () => (
  <TableCaption className="pb-2 mt-2 space-y-1">
    <Icon name="warning" className="text-danger-500" />
    <BodyText weight="medium" size={1} className="text-danger-500">
      Failed to fetch data.
    </BodyText>
  </TableCaption>
);
