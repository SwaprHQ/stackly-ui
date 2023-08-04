import { Order as StacklyOrder } from "@stackly/sdk";

export interface Order extends StacklyOrder {}
export interface OrderProps {
  order: Order;
}
