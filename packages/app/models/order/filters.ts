import { Order } from "@/models/order/types";

export const filterAllButCancelledOrders = (orders: Order[]) =>
  orders.filter(order => order.cancelledAt === null);
