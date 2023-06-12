import Link from "next/link";
import { ReactNode } from "react";

import { Order, totalOrdersDone } from "@/app/models/order";
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
} from "@/utils/time";

interface StackModalProps extends ModalBaseProps {
  order: Order;
}

const transactionExplorerLink = (address: string) =>
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
        <ModalContent>
          <div className="grid grid-cols-2 gap-y-5 md:flex md:justify-between">
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
          <TitleText size={2} weight="bold">
            Transactions
          </TitleText>
          <StackProgress order={order} />
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
