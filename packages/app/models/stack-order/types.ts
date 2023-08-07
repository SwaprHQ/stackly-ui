import { Order as CowOrder } from "@cowprotocol/cow-sdk";
import { Order } from "@stackly/sdk";

export interface StackOrder extends Order {
  cowOrders: CowOrder[];
}

export interface StackOrderProps {
  stackOrder: StackOrder;
}
