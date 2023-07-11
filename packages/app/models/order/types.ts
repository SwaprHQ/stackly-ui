import { Token } from "@/models/token/types";
import { Order as StacklyOrder } from "@stackly/sdk/dist/vaults/subgraph";

export type Order = StacklyOrder;

export interface OrderProps {
  order: Order;
}
