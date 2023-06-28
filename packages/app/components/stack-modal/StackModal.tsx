import Link from "next/link";
import { ReactNode } from "react";

import {
  Order,
  OrderProps,
  getOrderPairSymbols,
  totalFundsUsed,
  totalOrdersDone,
} from "@/models/order";
import { StackedTokenLogoPair } from "@/components/StackedTokenLogoPair";
import { StackProgress } from "@/components/stack-modal/StackProgress";
import {
  Modal,
  ModalFooter,
  Icon,
  Button,
  ModalContent,
  BodyText,
  ModalHeader,
  TitleText,
  ModalBaseProps,
} from "@/ui";
import {
  formatFrequencyHours,
  formatTimestampToDateWithTime,
} from "@/utils/datetime";
import { FromToStackTokenPair } from "@/components/FromToStackTokenPair";
import { StackTransactionsTable } from "@/components/stack-modal/StackTransactionsTable";
import { calculateStackAveragePrice, totalStacked } from "@/models/stack-order";

interface StackModalProps extends ModalBaseProps {
  order: Order;
}

export const transactionExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}#tokentxns`;

export const StackModal = ({ order, isOpen, closeAction }: StackModalProps) => {
  const orderSlots = order.orderSlots;
  const firstSlot = orderSlots[0];
  const lastSlot = orderSlots[orderSlots.length - 1];
  const nextSlot = orderSlots[totalOrdersDone(order)];

  return (
    <div>
      <Modal maxWidth="2xl" isOpen={isOpen} closeAction={closeAction}>
        <ModalHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <StackedTokenLogoPair order={order} />
              <Link
                target="_blank"
                href={transactionExplorerLink(order.id)}
                className="flex items-center space-x-0.5 hover:border-em-low border-b-2 border-em-disabled group"
              >
                <BodyText className="text-em-med">
                  {order.id.substring(0, 7)}
                </BodyText>
                <Icon
                  className="text-em-med group-hover:animate-bounce"
                  name="arrow-external"
                  size={16}
                />
              </Link>
            </div>
            <Button
              action="quaternary"
              iconLeft="close"
              size="icon"
              onClick={closeAction}
            />
          </div>
        </ModalHeader>
        <ModalContent className="px-0">
          <div className="grid grid-cols-2 gap-5 px-4 gap-x-8 md:grid-cols-4">
            <StackDetail title="Starts on">
              {formatTimestampToDateWithTime(firstSlot)}
            </StackDetail>
            <StackDetail title="Ends on">
              {formatTimestampToDateWithTime(lastSlot)}
            </StackDetail>
            <StackDetail title="Frequency">
              Every {formatFrequencyHours(Number(order.interval))}
            </StackDetail>
            <StackDetail title="Next order">
              {formatTimestampToDateWithTime(nextSlot)}
            </StackDetail>
          </div>
          <div className="w-full my-4 border-b border-surface-50"></div>
          <div className="px-4">
            <TitleText size={2} weight="bold">
              Transactions
            </TitleText>
            <StackProgress order={order} />
            <StackInfo order={order} />
            <StackTransactionsTable order={order} />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button
            size="sm"
            action="secondary"
            onClick={() => alert("Are you sure you want to cancel stacking?")}
            width="full"
          >
            Cancel Stacking
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const StackInfo = ({ order }: OrderProps) => (
  <div className="flex flex-col justify-between gap-2 px-4 py-3 mt-6 mb-4 md:items-center md:flex-row bg-surface-25 rounded-2xl">
    <FromToStackTokenPair
      fromToken={order.sellToken}
      fromText={totalFundsUsed(order).toFixed(2)}
      toToken={order.buyToken}
      toText={totalStacked(order).toFixed(4)}
    />
    <BodyText size="responsive" className="space-x-1">
      <span className="text-em-low">Avg buy price:</span>
      <span className="text-em-med">
        {calculateStackAveragePrice(order).toFixed(4)}
      </span>
      <span className="text-em-med">{getOrderPairSymbols(order)}</span>
    </BodyText>
  </div>
);

const StackDetail = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="space-y-1">
    <BodyText size={1} className="text-em-low">
      {title}
    </BodyText>
    <BodyText size={1}>{children}</BodyText>
  </div>
);
