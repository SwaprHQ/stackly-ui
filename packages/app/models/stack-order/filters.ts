import { currentTimestampInSeconds } from "@/utils/datetime";
import { Order } from "@stackly/sdk";

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

export const filterCancelledOrders = (orders: Order[]) =>
  orders.filter((order) => order.cancelledAt !== null);
