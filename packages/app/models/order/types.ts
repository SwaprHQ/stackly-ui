import { Token } from "@/models/token/types";

export interface Order {
  id: string;
  owner: string;
  receiver: string;
  amount: string;
  sellToken: Token;
  buyToken: Token;
  createdAt: string;
  startTime: number;
  endTime: number;
  orderSlots: string[];
  cancelledAt: string | null;
  interval: string;
}

export interface OrderProps {
  order: Order;
}
