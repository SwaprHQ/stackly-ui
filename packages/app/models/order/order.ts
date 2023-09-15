import { convertedAmount } from "@/utils/numbers";
import { currentTimestampInSeconds } from "@/utils/datetime";
import { Order } from "@stackly/sdk";

export const totalOrderSlotsDone = (order: Order) => {
  return order.orderSlots.reduce((count, orderTimestamp) => {
    if (Number(orderTimestamp) < currentTimestampInSeconds) return ++count;
    return count;
  }, 0);
};

export const allOrderSlotsDone = (order: Order) =>
  totalOrderSlotsDone(order) === order.orderSlots.length;

export const totalFundsAmount = (order: Order) => {
  const total =
    convertedAmount(order.amount, order.sellToken.decimals) + stacklyFee(order);

  return total.toFixed(2);
};

export const totalFundsAmountWithToken = (order: Order) =>
  `${totalFundsAmount(order)} ${order.sellToken.symbol}`;

export const getOrderPairSymbols = (order: Order) =>
  `${order.buyToken.symbol}/${order.sellToken.symbol}`;

export const stacklyFee = (order: Order) =>
  convertedAmount(order.feeAmount, order.sellToken.decimals);
