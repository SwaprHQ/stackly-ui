import { StackedTokenLogoPair } from "@/app/stacks/components/StackedTokenLogoPair";
import { ordersDone } from "@/app/stacks/components/StacksTable";
import { Order } from "@/app/stacks/page";
import {
  Modal,
  ModalFooter,
  Icon,
  Button,
  ModalContent,
  BodyText,
  ModalHeader,
} from "@/ui";
import {
  formatFrequencyHours,
  formatTimestampToDateWithTime,
} from "@/utils/time";
import Link from "next/link";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  closeAction: () => void;
}

interface StackModalProps extends ModalProps {
  order: Order;
}

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

const transactionExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}#internaltx`;

export const StackModal = ({ order, isOpen, closeAction }: StackModalProps) => {
  const orderSlots = order.orderSlots;
  const firstSlot = orderSlots[0];
  const lastSlot = orderSlots[orderSlots.length - 1];
  const nextSlot = orderSlots[ordersDone(order)];

  return (
    <div>
      <Modal isOpen={isOpen} close={closeAction}>
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
          <div className="flex justify-between">
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
        </ModalContent>
        <ModalFooter>
          <Button
            size="sm"
            action="secondary"
            onClick={() => console.log("cancel")}
            width="full"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
