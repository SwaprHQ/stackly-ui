"use client";

import { PropsWithChildren, useState } from "react";
import {
  BodyText,
  Button,
  CaptionText,
  Icon,
  OverlineText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import { StackedTokenLogoPair, StackModal } from "@/components";
import {
  fundsAmountWithToken,
  getOrderPairSymbols,
  totalOrderSlotsDone,
} from "@/models/order";
import {
  formatTimestampToDate,
  formatTimestampToDateWithSuffix,
} from "@/utils/datetime";
import {
  StackOrder,
  StackOrderProps,
  calculateStackAveragePrice,
  stackIsFinishedWithFunds,
  totalFundsUsed,
  totalStackOrdersDone,
  totalStacked,
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";
import { ModalId, useModalContext } from "@/contexts";

interface StacksTableProps {
  stackOrders: StackOrder[];
  refetchStacks: () => void;
}

export const StacksTable = ({
  stackOrders,
  refetchStacks,
}: StacksTableProps) => {
  const [stackOrder, setStackOrder] = useState<StackOrder>();

  const { closeModal, isModalOpen, openModal } = useModalContext();

  const setupAndOpenModal = (stackOrder: StackOrder) => {
    setStackOrder(stackOrder);
    openModal(ModalId.STACK);
  };

  return (
    <div className="w-full bg-white border rounded-3xl border-surface-50">
      <Table>
        <TableHeader>
          <TableRow className="h-10 md:h-12">
            <TableHead>Stack</TableHead>
            <TableHead className="text-right">Used funds</TableHead>
            <TableHead className="text-right">Avg. Buy Price</TableHead>
            <TableHead className="text-right">Progress</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stackOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="flex items-center font-medium w-max">
                <StackedTokenLogoPair order={order} />
                <div className="ml-3 space-y-0.5">
                  <BodyText weight="bold">
                    {formatTokenValue(totalStacked(order))}
                  </BodyText>
                  <CaptionText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </CaptionText>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {formatTokenValue(totalFundsUsed(order), 2)}
                  </BodyText>
                  <BodyText className="text-em-low">
                    / {fundsAmountWithToken(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {formatTokenValue(calculateStackAveragePrice(order))}
                  </BodyText>
                  <BodyText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  {stackIsFinishedWithFunds(order) ? (
                    <div className="flex items-center p-1 space-x-1.5 rounded">
                      <Icon
                        name="warning"
                        size={14}
                        className="text-danger-500"
                      />
                      <OverlineText className="text-danger-500">
                        Widthdraw funds
                      </OverlineText>
                    </div>
                  ) : (
                    <OrdersProgressText stackOrder={order} />
                  )}
                </CellWrapper>
              </TableCell>
              <TableCell>
                <Button
                  className="w-max"
                  size="sm"
                  variant="tertiary"
                  onClick={() => setupAndOpenModal(order)}
                >
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {stackOrder && (
        <StackModal
          refetchStacks={refetchStacks}
          isOpen={isModalOpen(ModalId.STACK)}
          closeAction={() => closeModal(ModalId.STACK)}
          stackOrder={stackOrder}
        />
      )}
    </div>
  );
};

const CellWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-end space-x-1 w-max lg:w-auto">
    {children}
  </div>
);

const OrdersProgressText = ({ stackOrder }: StackOrderProps) => {
  if (stackOrder.cancelledAt)
    return (
      <BodyText className="text-em-low">
        Cancelled at {formatTimestampToDate(stackOrder.cancelledAt)}
      </BodyText>
    );

  return totalOrderSlotsDone(stackOrder) === 0 ? (
    <BodyText className="text-primary-700">
      Starts on {formatTimestampToDateWithSuffix(stackOrder.orderSlots[0])}
    </BodyText>
  ) : (
    <>
      <BodyText className="text-em-high">
        {totalStackOrdersDone(stackOrder).toString()}
      </BodyText>
      <BodyText className="text-em-low">{`/ ${stackOrder.orderSlots.length} orders`}</BodyText>
    </>
  );
};
