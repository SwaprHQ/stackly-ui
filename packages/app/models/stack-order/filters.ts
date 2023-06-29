import { StackOrder } from "@/models/stack-order";
import { currentTimestampInSeconds } from "@/utils/datetime";

export const filterCompletedOrders = (orders: StackOrder[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) < currentTimestampInSeconds &&
      order.cancelledAt === null
  );

export const filterActiveOrders = (orders: StackOrder[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) > currentTimestampInSeconds &&
      order.cancelledAt === null
  );
