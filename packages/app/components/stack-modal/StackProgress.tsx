import {
  OrderProps,
  fundsAmountWithToken,
  totalOrdersDone,
  totalFundsUsed,
} from "@/models/order";
import { OrdersProgressBar } from "@/components/OrdersProgressBar";
import { BodyText } from "@/ui";

export const StackProgress = ({ order }: OrderProps) => (
  <div className="mt-3 space-y-3">
    <div className="flex flex-col justify-between space-y-1 md:space-y-0 md:items-center md:flex-row">
      <OrdersExecuted order={order} />
      <div className="flex items-center space-x-1">
        <BodyText size="responsive" className="text-em-low">
          Total funds used:{" "}
          <span className="text-em-high">
            {totalFundsUsed(order).toFixed(2)}{" "}
            <span className="text-xs">of</span> {fundsAmountWithToken(order)}
          </span>
        </BodyText>
        <div className="w-4 h-4 rounded-full bg-primary-100"></div>
      </div>
    </div>
    <OrdersProgressBar order={order} />
  </div>
);

const OrdersExecuted = ({ order }: OrderProps) => {
  if (!totalOrdersDone(order))
    return <BodyText className="text-em-low">No orders executed yet.</BodyText>;

  return (
    <div className="flex items-center space-x-1">
      <BodyText size="responsive" className="text-em-low">
        Orders executed:
      </BodyText>
      <BodyText size="responsive">
        {totalOrdersDone(order)} <span className="text-xs">out of</span>{" "}
        {order.orderSlots.length}
      </BodyText>
    </div>
  );
};
