import { StackOrder } from "@/models/stack-order";
import { convertedAmount } from "@/utils/numbers";

export const calculateStackAveragePrice = (order: StackOrder) => {
  let totalExecutedBuyAmount = 0;
  let totalExecutedSellAmount = 0;

  if (!order.cowOrders) return 0;

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

export const totalStacked = (order: StackOrder) =>
  order.cowOrders?.reduce((acc, cowOrder) => {
    return (
      acc + convertedAmount(cowOrder.executedBuyAmount, order.buyToken.decimals)
    );
  }, 0) ?? 0;
