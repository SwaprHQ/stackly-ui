import { Order } from "@/models/order/types";
import { currentTimestampInSeconds } from "@/utils/datetime";

export const filterCompletedOrders = (orders: Order[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) < currentTimestampInSeconds &&
      order.cancelledAt === null
  );

export const filterActiveOrders = (orders: Order[]) =>
  orders.filter(
    (order) =>
      Number(order.endTime) > currentTimestampInSeconds &&
      order.cancelledAt === null
  );
