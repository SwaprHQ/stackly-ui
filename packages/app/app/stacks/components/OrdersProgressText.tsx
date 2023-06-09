import { OrderProps, ordersDone } from "@/app/models/order";
import { BodyText } from "@/ui";
import { formatTimestampToDateWithSuffix } from "@/utils/time";

export const OrdersProgressText = ({ order }: OrderProps) =>
  ordersDone(order) === 0 ? (
    <BodyText className="text-primary-700">
      Starts on {formatTimestampToDateWithSuffix(order.orderSlots[0])}
    </BodyText>
  ) : (
    <>
      <BodyText className="text-em-high">
        {ordersDone(order).toString()}
      </BodyText>
      <BodyText className="text-em-low">{`/ ${order.orderSlots.length} orders`}</BodyText>
    </>
  );
