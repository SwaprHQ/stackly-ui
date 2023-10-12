import { ChainId } from "@stackly/sdk";

export enum FREQUENCY_OPTIONS {
  hour = "hour",
  day = "day",
  week = "week",
  month = "month",
}

export interface Transaction {
  chainId: ChainId;
  hash: string;
}
