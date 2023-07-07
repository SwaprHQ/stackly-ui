import { Order } from "@/models/order";
import { Order as CowOrder } from "@cowprotocol/cow-sdk";

export interface StackOrder extends Order {
  cowOrders: CowOrder[];
}

export interface StackOrderProps {
  stackOrder: StackOrder;
}
