import { fundsAmountWithToken, totalOrderSlotsDone } from "@/models/order";
import { OrdersProgressBar } from "@/components/OrdersProgressBar";
import { BodyText } from "@/ui";
import { TokenIcon } from "@/components/TokenIcon";
import {
  StackOrderProps,
  totalStackOrdersDone,
  totalFundsUsed,
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";

export const StackProgress = ({ stackOrder }: StackOrderProps) => (
  <div className="space-y-2">
    <div className="flex flex-col justify-between space-y-1 md:space-y-0 md:items-center md:flex-row">
      <OrdersExecuted stackOrder={stackOrder} />
      <div className="flex items-center space-x-1">
        <BodyText size="responsive" className="text-em-low">
          Total funds used:{" "}
          <span className="text-em-high">
            {formatTokenValue(totalFundsUsed(stackOrder), 2)}{" "}
            <span className="text-xs">of</span>{" "}
            {fundsAmountWithToken(stackOrder)}
          </span>
        </BodyText>
        <TokenIcon size="xs" token={stackOrder.sellToken} />
      </div>
    </div>
    <OrdersProgressBar stackOrder={stackOrder} />
  </div>
);

const OrdersExecuted = ({ stackOrder }: StackOrderProps) => {
  if (!totalOrderSlotsDone(stackOrder))
    return <BodyText className="text-em-low">No orders executed yet.</BodyText>;

  return (
    <div className="flex items-center space-x-1">
      <BodyText size="responsive" className="text-em-low">
        Executed:
      </BodyText>
      <BodyText size="responsive">
        {totalStackOrdersDone(stackOrder)}{" "}
        <span className="text-xs">out of</span> {stackOrder.orderSlots.length}
      </BodyText>
    </div>
  );
};
