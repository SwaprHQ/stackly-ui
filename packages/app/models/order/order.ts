import { convertedAmount } from "@/utils/numbers";
import { currentTimestampInSeconds } from "@/utils/datetime";
import { Order } from "@stackly/sdk";

export const totalOrdersDone = (order: Order) => {
  return order.orderSlots.reduce((count, orderTimestamp) => {
    if (Number(orderTimestamp) < currentTimestampInSeconds) return ++count;
    return count;
  }, 0);
};

export const allOrderSlotsDone = (order: Order) =>
  totalOrdersDone(order) === order.orderSlots.length;

export const fundsAmount = (order: Order) =>
  convertedAmount(order.amount, order.sellToken.decimals).toFixed(2);

export const fundsAmountWithToken = (order: Order) =>
  `${fundsAmount(order)} ${order.sellToken.symbol}`;

export const totalOrders = (order: Order) => order.orderSlots.length;

export const getOrderPairSymbols = (order: Order) =>
  `${order.buyToken.symbol}/${order.sellToken.symbol}`;
