import { convertedAmount } from "@/utils/numbers";
import { currentTimestampInSeconds } from "@/utils/datetime";
import { Order } from "@stackly/sdk";

export const totalOrderSlotsDone = (order: Order) => {
  /**
   * An order that doesn't have slots happens when we have a 1 slot order
   * that has start and end date in a timeframe equal or less than 60'.
   * As it's not possible to use the slot timestamp, we use the start time
   * for this 1 slot order.
   */
  if (!order.orderSlots.length)
    return order.startTime < currentTimestampInSeconds ? 1 : 0;

  return order.orderSlots.reduce((count, orderTimestamp) => {
    if (Number(orderTimestamp) < currentTimestampInSeconds) return ++count;
    return count;
  }, 0);
};

export const allOrderSlotsDone = (order: Order) => {
  const orderSlotsLength = order.orderSlots.length;
  if (!orderSlotsLength) return totalOrderSlotsDone(order) === 1;

  return totalOrderSlotsDone(order) === orderSlotsLength;
};

export const totalFundsAmount = (order: Order) => {
  const total =
    convertedAmount(order.amount, order.sellToken.decimals) + stacklyFee(order);

  return total.toFixed(2);
};

export const totalFundsAmountWithTokenText = (order: Order) =>
  `${totalFundsAmount(order)} ${order.sellToken.symbol}`;

export const orderPairSymbolsText = (order: Order) =>
  `${order.buyToken.symbol}/${order.sellToken.symbol}`;

export const stacklyFee = (order: Order) =>
  convertedAmount(order.feeAmount, order.sellToken.decimals);
