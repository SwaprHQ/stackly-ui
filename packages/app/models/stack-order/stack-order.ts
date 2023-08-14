import { allOrderSlotsDone } from "@/models/order";
import { StackOrder } from "@/models/stack-order";
import { convertedAmount } from "@/utils/numbers";

export const totalStackOrdersDone = (order: StackOrder) => {
  if (!order?.cowOrders?.length) return 0;

  return order.cowOrders.length;
};

export const calculateStackAveragePrice = (order: StackOrder) => {
  let totalExecutedBuyAmount = 0;
  let totalExecutedSellAmount = 0;

  if (!order?.cowOrders?.length) return 0;

  order.cowOrders.forEach((cowOrder) => {
    if (cowOrder.executedBuyAmount === "0") return;

    totalExecutedBuyAmount += convertedAmount(
      cowOrder.executedBuyAmount,
      order.buyToken.decimals
    );
    totalExecutedSellAmount += convertedAmount(
      cowOrder.executedSellAmount,
      order.sellToken.decimals
    );
  });
  const averagePrice = totalExecutedSellAmount / totalExecutedBuyAmount;
  return averagePrice;
};

export const totalFundsUsed = (order: StackOrder) =>
  order.cowOrders?.reduce((acc, cowOrder) => {
    return (
      acc +
      convertedAmount(cowOrder.executedSellAmount, order.sellToken.decimals)
    );
  }, 0) ?? 0;

export const totalStacked = (order: StackOrder) =>
  order.cowOrders?.reduce((acc, cowOrder) => {
    return (
      acc + convertedAmount(cowOrder.executedBuyAmount, order.buyToken.decimals)
    );
  }, 0) ?? 0;

const stackHasRemainingFunds = (stackOrder: StackOrder) =>
  stackRemainingFunds(stackOrder) !== 0;

export const stackRemainingFunds = (stackOrder: StackOrder) => {
  if (totalFundsUsed(stackOrder) === 0 && totalStackOrdersDone(stackOrder) > 0)
    return 0;

  return (
    convertedAmount(stackOrder.amount, stackOrder.sellToken.decimals) -
    totalFundsUsed(stackOrder)
  );
};

export const stackIsComplete = (stackOrder: StackOrder) =>
  allOrderSlotsDone(stackOrder) && !stackHasRemainingFunds(stackOrder);

export const stackIsFinishedWithFunds = (stackOrder: StackOrder) =>
  allOrderSlotsDone(stackOrder) &&
  stackHasRemainingFunds(stackOrder) &&
  !stackOrder.cancelledAt;

export const stackRemainingFundsWithToken = (stackOrder: StackOrder) =>
  `${stackRemainingFunds(stackOrder)} ${stackOrder.sellToken.symbol}`;
