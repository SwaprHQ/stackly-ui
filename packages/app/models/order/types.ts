import { Token } from "@/models/token/types";
import { OrderMetaData } from "@cowprotocol/cow-sdk";

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
  cowData?: OrderMetaData[];
}

export interface OrderProps {
  order: Order;
}
