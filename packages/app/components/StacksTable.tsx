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
  TableRow
} from "@/ui";
import { StackedTokenLogoPair } from "@/components/StackedTokenLogoPair";
import { StackModal } from "@/components/stack-modal/StackModal";
import {
  fundsAmountWithToken,
  getOrderPairSymbols,
  totalFundsUsed,
  totalOrdersDone
} from "@/models/order";
import { formatTimestampToDateWithSuffix } from "@/utils/datetime";
import {
  StackOrder,
  StackOrderProps,
  calculateStackAveragePrice,
  totalStacked
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";

export const StacksTable = ({ stackOrders }: { stackOrders: StackOrder[] }) => {
  const [stackOrder, setStackOrder] = useState<StackOrder>();
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const setupAndOpenModal = (stackOrder: StackOrder) => {
    setStackOrder(stackOrder);
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
          {stackOrders.map(order => (
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
                  <OrdersProgressText stackOrder={order} />
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

const OrdersProgressText = ({ stackOrder }: StackOrderProps) =>
  totalOrdersDone(stackOrder) === 0 ? (
    <BodyText className="text-primary-700">
      Starts on {formatTimestampToDateWithSuffix(stackOrder.orderSlots[0])}
    </BodyText>
  ) : (
    <>
      <BodyText className="text-em-high">
        {totalOrdersDone(stackOrder).toString()}
      </BodyText>
      <BodyText className="text-em-low">{`/ ${stackOrder.orderSlots.length} orders`}</BodyText>
    </>
  );
