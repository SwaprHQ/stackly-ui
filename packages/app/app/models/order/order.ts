import { Order } from "./types";
import { convertedAmount } from "@/utils/numbers";
import { currentTimestampInSeconds } from "@/utils/time";

export const ordersDone = (order: Order) => {
  return order.orderSlots.reduce((count, orderTimestamp) => {
    if (Number(orderTimestamp) < currentTimestampInSeconds) return ++count;

    return count;
  }, 0);
};

export const totalFundsUsed = (order: Order) =>
  Number(buyAmountPerSlot(order)) * ordersDone(order);

const buyAmountPerSlot = (order: Order) =>
  convertedAmount(
    Number(order.amount) / order.orderSlots.length,
    order.buyToken.decimals
  );

export const fundsUsed = (order: Order) =>
  convertedAmount(order.amount, order.buyToken.decimals).toFixed(2);

export const fundsUsedWithToken = (order: Order) =>
  `${fundsUsed(order)} ${order.sellToken.symbol}`;

export const totalOrders = (order: Order) => order.orderSlots.length;

export const getOrderPairSymbols = (order: Order) =>
  `${order.buyToken.symbol}/${order.sellToken.symbol}`;
