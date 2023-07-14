"use client";

import Link from "next/link";
import { ReactNode } from "react";

import {
  getOrderPairSymbols,
  totalFundsUsed,
  totalOrdersDone
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
  ModalBaseProps
} from "@/ui";
import {
  formatFrequencyHours,
  formatTimestampToDateWithTime
} from "@/utils/datetime";
import { FromToStackTokenPair } from "@/components/FromToStackTokenPair";
import { StackOrdersTable } from "@/components/stack-modal/StackOrdersTable";
import {
  StackOrder,
  StackOrderProps,
  calculateStackAveragePrice,
  totalStacked
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";

interface StackModalProps extends ModalBaseProps {
  stackOrder: StackOrder;
}

export const transactionExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}#tokentxns`;

export const StackModal = ({
  stackOrder,
  isOpen,
  closeAction
}: StackModalProps) => {
  const orderSlots = stackOrder.orderSlots;
  const firstSlot = orderSlots[0];
  const lastSlot = orderSlots[orderSlots.length - 1];
  const nextSlot = orderSlots[totalOrdersDone(stackOrder)];
  const stackIsComplete = totalOrdersDone(stackOrder) === orderSlots.length;

  return (
    <div>
      <Modal maxWidth="2xl" isOpen={isOpen} closeAction={closeAction}>
        <ModalHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <StackedTokenLogoPair order={stackOrder} />
              <Link
                passHref
                target="_blank"
                href={transactionExplorerLink(stackOrder.id)}
                className="flex items-center space-x-0.5 hover:border-em-low border-b-2 border-em-disabled group"
              >
                <BodyText className="text-em-med">
                  {stackOrder.id.substring(0, 7)}
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
              Every {formatFrequencyHours(Number(stackOrder.interval))}
            </StackDetail>
            <StackDetail title="Next order">
              {stackIsComplete
                ? "Complete"
                : formatTimestampToDateWithTime(nextSlot)}
            </StackDetail>
          </div>
          <div className="w-full my-4 border-b border-surface-50"></div>
          <div className="px-4">
            <TitleText size={2} weight="bold">
              Orders
            </TitleText>
            <StackProgress stackOrder={stackOrder} />
            <StackInfo stackOrder={stackOrder} />
            {totalOrdersDone(stackOrder) > 0 && (
              <StackOrdersTable stackOrder={stackOrder} />
            )}
          </div>
        </ModalContent>
        <ModalFooter>
          {!stackIsComplete && (
            <Button
              size="sm"
              action="secondary"
              onClick={() => alert("Are you sure you want to cancel stacking?")}
              width="full"
            >
              Cancel Stacking
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const StackInfo = ({ stackOrder }: StackOrderProps) => (
  <div className="flex flex-col justify-between gap-2 px-4 py-3 mt-6 mb-4 md:items-center md:flex-row bg-surface-25 rounded-2xl">
    <FromToStackTokenPair
      fromToken={stackOrder.sellToken}
      fromText={formatTokenValue(totalFundsUsed(stackOrder))}
      toToken={stackOrder.buyToken}
      toText={formatTokenValue(totalStacked(stackOrder))}
    />
    <BodyText size="responsive" className="space-x-1">
      <span className="text-em-low">Avg buy price:</span>
      <span className="text-em-med">
        {formatTokenValue(calculateStackAveragePrice(stackOrder))}
      </span>
      <span className="text-em-med">{getOrderPairSymbols(stackOrder)}</span>
    </BodyText>
  </div>
);

const StackDetail = ({
  title,
  children
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
