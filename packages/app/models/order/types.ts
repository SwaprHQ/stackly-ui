import { Order as StacklyOrder } from "@stackly/sdk/dist/vaults/subgraph";

export interface Order extends StacklyOrder {}
export interface OrderProps {
  order: Order;
}
