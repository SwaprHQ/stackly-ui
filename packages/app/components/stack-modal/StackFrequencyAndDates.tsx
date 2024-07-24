import {
  StackOrderProps,
  stackIsComplete,
  stackIsFinishedWithFunds,
  totalOrderSlotsDone,
} from "@/models";
import { BodyText } from "@/ui";
import { formatFrequencyHours, formatTimestampToDateWithTime } from "@/utils";
import { ReactNode } from "react";

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

export const StackFrequencyAndDates = ({ stackOrder }: StackOrderProps) => {
  const orderSlots = stackOrder.orderSlots;
  const hasSlots = Boolean(orderSlots.length);
  const firstSlot = hasSlots ? orderSlots[0] : stackOrder.startTime;
  const lastSlot = hasSlots
    ? orderSlots[orderSlots.length - 1]
    : stackOrder.endTime;
  const nextSlot = orderSlots[totalOrderSlotsDone(stackOrder)];

  return (
    <div className="grid grid-cols-2 gap-5 px-4 md:px-6 gap-x-8 md:grid-cols-4">
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
        {stackIsComplete(stackOrder)
          ? "Complete"
          : stackIsFinishedWithFunds(stackOrder)
          ? "Finished with funds"
          : stackOrder.cancelledAt
          ? "Cancelled"
          : formatTimestampToDateWithTime(nextSlot)}
      </StackDetail>
    </div>
  );
};
