import { Order } from "@/models/order";
import { OrderMetaData } from "@cowprotocol/cow-sdk";

export interface StackOrder extends Order {
  cowData?: OrderMetaData[];
}
