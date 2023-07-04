import { useState } from "react";
import { cowExplorerUrl } from "@/models/cow-order";
import { getOrderPairSymbols } from "@/models/order";
import { StackOrderProps } from "@/models/stack-order";
import {
  BodyText,
  Icon,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/ui";
import { formatDate } from "@/utils/datetime";
import { convertedAmount } from "@/utils/numbers";
import { addressShortner } from "@/utils/token";
import { Order as CowOrder } from "@cowprotocol/cow-sdk";
import Link from "next/link";

const INITIAL_NUMBER_OF_COW_ORDERS = 8;

export const StackOrdersTable = ({ stackOrder }: StackOrderProps) => {
  const initialCowOrders =
    stackOrder?.cowOrders?.slice(0, INITIAL_NUMBER_OF_COW_ORDERS) ?? [];

  const [cowOrders, setCowOrders] = useState<CowOrder[]>(initialCowOrders);

  function addMoreOrders() {
    setCowOrders(stackOrder.cowOrders.slice(0, cowOrders.length + 4));
  }

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
              <BodyText size={1}>{getOrderPairSymbols(stackOrder)}</BodyText>
            </TableHead>
          </TableRow>
        </TableHeader>
        {cowOrders.length > 0 ? (
          <>
            <TableCowBody cowOrders={cowOrders} />
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

const TableCowBody = ({ cowOrders }: { cowOrders: CowOrder[] }) => {
  const formatAmount = (amount: string) =>
    convertedAmount(amount, 18).toFixed(4);
  const averagePrice = (cowOrder: CowOrder) =>
    (
      Number(cowOrder.executedSellAmount) / Number(cowOrder.executedBuyAmount)
    ).toFixed(4);

  return (
    <TableBody>
      {cowOrders.map(cowOrder => (
        <TableRow key={cowOrder.uid}>
          <TableCell className="py-2 md:table-cell">
            <BodyText
              size={1}
              className="text-primary-700 hover:underline hover:underline-offset-2"
            >
              <Link
                target="_blank"
                href={cowExplorerUrl({
                  chainId: 100,
                  uid: cowOrder.uid
                })}
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
              {formatAmount(cowOrder.executedSellAmount)}
            </BodyText>
          </TableCell>
          <TableCell className="py-2 text-right ">
            <BodyText className="text-em-med" size={1}>
              {formatAmount(cowOrder.executedBuyAmount)}
            </BodyText>
          </TableCell>
          <TableCell className="hidden py-2 text-right md:table-cell">
            {cowOrder.status === "fulfilled" ? (
              <BodyText className="text-em-med" size={1}>
                {averagePrice(cowOrder)}
              </BodyText>
            ) : (
              <BodyText className="text-gray-400 animate-pulse" size={1}>
                fulfilling
              </BodyText>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const FailedToFetchCowData = () => (
  <TableCaption className="pb-2 mt-2 space-y-1">
    <Icon name="warning" className="text-danger-500" />
    <BodyText weight="medium" size={1} className="text-danger-500">
      Failed to fetch data from cow api
    </BodyText>
  </TableCaption>
);
