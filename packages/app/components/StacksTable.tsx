import { PropsWithChildren, useState } from "react";
import {
  BodyText,
  Button,
  CaptionText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui";
import { StackedTokenLogoPair } from "@/components/StackedTokenLogoPair";
import { StackModal } from "@/components/stack-modal/StackModal";
import {
  Order,
  OrderProps,
  fundsAmountWithToken,
  getOrderPairSymbols,
  totalFundsUsed,
  totalOrdersDone,
} from "@/models/order";
import { convertedAmount } from "@/utils/numbers";
import { formatTimestampToDateWithSuffix } from "@/utils/datetime";

export const calculateAveragePrice = (order: Order) => {
  let totalExecutedBuyAmount = 0;
  let totalExecutedSellAmount = 0;
  
  if (!order.cowData) return 0;
  
  order.cowData.forEach((cowOrder) => {
    if (cowOrder.executedBuyAmount === "0") return;

    totalExecutedBuyAmount += convertedAmount(
      cowOrder.executedBuyAmount,
      order.buyToken.decimals
    );
    totalExecutedSellAmount += convertedAmount(
      cowOrder.executedSellAmount,
      order.sellToken.decimals
    );
  });
  const averagePrice = totalExecutedSellAmount / totalExecutedBuyAmount;
  return averagePrice;
};

export const totalStacked = (order: Order) =>
  order.cowData?.reduce((acc, cowOrder) => {
    return (
      acc + convertedAmount(cowOrder.executedBuyAmount, order.buyToken.decimals)
    );
  }, 0) ?? 0;

export const StacksTable = ({ orders }: { orders: Order[] }) => {
  const [stackOrder, setStackOrder] = useState<Order>();
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const setupAndOpenModal = (order: Order) => {
    setStackOrder(order);
    setModalOpen(true);
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="flex items-center font-medium w-max">
                <StackedTokenLogoPair order={order} />
                <div className="ml-3 space-y-0.5">
                  <BodyText weight="bold">
                    {totalStacked(order).toFixed(3)}
                  </BodyText>
                  <CaptionText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </CaptionText>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {totalFundsUsed(order).toFixed(2)}
                  </BodyText>
                  <BodyText className="text-em-low">
                    / {fundsAmountWithToken(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <BodyText className="text-em-high">
                    {calculateAveragePrice(order).toFixed(3)}
                  </BodyText>
                  <BodyText className="text-em-low">
                    {getOrderPairSymbols(order)}
                  </BodyText>
                </CellWrapper>
              </TableCell>
              <TableCell className="text-right">
                <CellWrapper>
                  <OrdersProgressText order={order} />
                </CellWrapper>
              </TableCell>
              <TableCell className="flex justify-end">
                <Button
                  className="w-max"
                  size="sm"
                  action="tertiary"
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
          isOpen={isModalOpen}
          closeAction={closeModal}
          order={stackOrder}
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

const OrdersProgressText = ({ order }: OrderProps) =>
  totalOrdersDone(order) === 0 ? (
    <BodyText className="text-primary-700">
      Starts on {formatTimestampToDateWithSuffix(order.orderSlots[0])}
    </BodyText>
  ) : (
    <>
      <BodyText className="text-em-high">
        {totalOrdersDone(order).toString()}
      </BodyText>
      <BodyText className="text-em-low">{`/ ${order.orderSlots.length} orders`}</BodyText>
    </>
  );
