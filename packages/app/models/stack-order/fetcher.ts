import { getCowOrders } from "@/models/cow-order";
import { StackOrder } from "@/models/stack-order/types";

export async function getStackOrders(orders: StackOrder[]) {
  const ordersPromises = orders.map(async (order) => {
    try {
      order.cowData = await getCowOrders(order.id);
      return order;
    } catch (error) {
      console.error("Error on getStackOrders", error);
      throw error; // Re-throw the error to propagate it to Promise.all
    }
  });

  try {
    return await Promise.all(ordersPromises);
  } catch (error) {
    // Handle any errors thrown during Promise.all
    console.error("Error occurred during Promise.all:", error);
    throw error;
  }
}
