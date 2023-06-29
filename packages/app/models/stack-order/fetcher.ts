import { getCowOrders } from "@/models/cow-order";
import { Order } from "@/models/order";
import { StackOrder } from "@/models/stack-order/types";

export async function getStackOrders(orders: Order[]): Promise<StackOrder[]> {
  const ordersPromises = orders.map(async (order): Promise<StackOrder> => {
    try {
      const cowOrders = await getCowOrders(order.id);
      return { ...order, cowOrders };
    } catch (error) {
      console.error("Error on getStackOrders", error);
      throw error; // Re-throw the error to propagate it to Promise.all
    }
  });

  try {
    return await Promise.all(ordersPromises);
  } catch (error) {
    // Handle any errors thrown during Promise.all
    console.error("Error on stack orders promise.all", error);
    throw error;
  }
}
