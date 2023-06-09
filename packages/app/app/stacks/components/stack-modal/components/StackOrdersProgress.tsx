import {
  OrderProps,
  fundsUsedWithToken,
  ordersDone,
  totalFundsUsed,
} from "@/app/models/order";
import { ProgressBar } from "@/app/stacks/components/stack-modal/components/ProgressBar";
import { BodyText } from "@/ui";

const OrdersExecuted = ({ order }: OrderProps) => {
  if (!ordersDone(order))
    return <BodyText className="text-em-low">No orders executed yet</BodyText>;

  return (
    <div className="flex items-center space-x-1">
      <BodyText size="responsive" className="text-em-low">
        Orders executed:
      </BodyText>
      <BodyText size="responsive">
        {ordersDone(order)} out of {order.orderSlots.length}
      </BodyText>
    </div>
  );
};

export const StackOrdersProgress = ({ order }: OrderProps) => {
  return (
    <div className="mt-3 space-y-3">
      <div className="flex flex-col justify-between space-y-1 md:space-y-0 md:items-center md:flex-row">
        <OrdersExecuted order={order} />
        <div className="flex items-center space-x-1">
          <BodyText size="responsive" className="text-em-low">
            Total funds used:{" "}
            <span className="text-em-high">
              {totalFundsUsed(order).toFixed(2)}{" "}
              <span className="text-xs text-em-low">of</span>{" "}
              {fundsUsedWithToken(order)}
            </span>
          </BodyText>
          <div className="w-4 h-4 rounded-full bg-primary-100"></div>
        </div>
      </div>
      <ProgressBar order={order} />
    </div>
  );
};
