import { getCowOrders } from "@/models/cow-order";
import { Order } from "@/models/order";
import { StackOrder } from "@/models/stack-order/types";

export async function getStackOrders(orders: Order[]): Promise<StackOrder[]> {
  const ordersPromises = orders.map(async (order): Promise<StackOrder> => {
    const cowOrders = await getCowOrders(order.id);
    return { ...order, cowOrders };
  });

  return await Promise.all(ordersPromises);
}
