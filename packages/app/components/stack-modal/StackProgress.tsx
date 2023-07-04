import {
  fundsAmountWithToken,
  totalOrdersDone,
  totalFundsUsed,
} from "@/models/order";
import { OrdersProgressBar } from "@/components/OrdersProgressBar";
import { BodyText } from "@/ui";
import { TokenIcon } from "@/components/TokenIcon";
import { StackOrderProps } from "@/models/stack-order";

export const StackProgress = ({ stackOrder }: StackOrderProps) => (
  <div className="mt-3 space-y-3">
    <div className="flex flex-col justify-between space-y-1 md:space-y-0 md:items-center md:flex-row">
      <OrdersExecuted stackOrder={stackOrder} />
      <div className="flex items-center space-x-1">
        <BodyText size="responsive" className="text-em-low">
          Total funds used:{" "}
          <span className="text-em-high">
            {totalFundsUsed(stackOrder).toFixed(2)}{" "}
            <span className="text-xs">of</span>{" "}
            {fundsAmountWithToken(stackOrder)}
          </span>
        </BodyText>
        <TokenIcon size="xs" token={stackOrder.sellToken} />
      </div>
    </div>
    <OrdersProgressBar order={stackOrder} />
  </div>
);

const OrdersExecuted = ({ stackOrder }: StackOrderProps) => {
  if (!totalOrdersDone(stackOrder))
    return <BodyText className="text-em-low">No orders executed yet.</BodyText>;

  return (
    <div className="flex items-center space-x-1">
      <BodyText size="responsive" className="text-em-low">
        Executed:
      </BodyText>
      <BodyText size="responsive">
        {totalOrdersDone(stackOrder)} <span className="text-xs">out of</span>{" "}
        {stackOrder.orderSlots.length}
      </BodyText>
    </div>
  );
};
