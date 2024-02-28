import {
  allOrderSlotsDone,
  totalFundsAmountWithTokenText,
  totalOrderSlotsDone,
} from "@/models/order";
import { OrdersProgressBar } from "@/components/OrdersProgressBar";
import { BodyText } from "@/ui";
import { TokenIcon } from "@/components/TokenIcon";
import {
  StackOrderProps,
  totalStackOrdersDone,
  totalFundsUsed,
  estimatedTotalStack,
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
            {totalFundsAmountWithTokenText(stackOrder)}
          </span>
        </BodyText>
        <TokenIcon size="xs" token={stackOrder.sellToken} />
      </div>
    </div>
    <OrdersProgressBar stackOrder={stackOrder} />
    <TotalStackEstimationText stackOrder={stackOrder} />
  </div>
);

const TotalStackEstimationText = ({ stackOrder }: StackOrderProps) => {
  if (allOrderSlotsDone(stackOrder)) return;
  if (totalStackOrdersDone(stackOrder) < 1) return;

  return (
    <div className="flex flex-row-reverse">
      <div
        className="flex items-center space-x-1"
        title="An estimation of the total tokens you'll buy based on the average price (calc: amount / avg)."
      >
        <BodyText size={1} className="space-x-1">
          <span className="text-em-low">Estimated total:</span>
          <span className="text-em-med">
            {formatTokenValue(estimatedTotalStack(stackOrder))}
          </span>
          <span>{stackOrder.buyToken.symbol}</span>
        </BodyText>
        <TokenIcon size="2xs" token={stackOrder.buyToken} />
      </div>
    </div>
  );
};

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
