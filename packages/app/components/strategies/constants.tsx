import { FREQUENCY_OPTIONS } from "@/models/stack";
import { GNO, USDC, WBTC, WETH, WXDAI } from "@/models/token";

export const FREQUENCY_LABEL = {
  [FREQUENCY_OPTIONS.hour]: "hourly",
  [FREQUENCY_OPTIONS.day]: "daily",
  [FREQUENCY_OPTIONS.week]: "weekly",
  [FREQUENCY_OPTIONS.month]: "monthly",
};

export const STRATEGY_CATEGORIES = {
  popular: {
    label: "Popular Strategies",
    strategies: [
      {
        id: 1,
        buyToken: WETH,
        daysAmount: 30,
        frequency: FREQUENCY_OPTIONS.day,
        sellAmountPerTimeframe: 100,
        sellToken: USDC,
        totalSellAmount: "3000",
      },
      {
        id: 2,
        buyToken: WETH,
        daysAmount: 30,
        frequency: FREQUENCY_OPTIONS.hour,
        sellAmountPerTimeframe: 5,
        sellToken: USDC,
        totalSellAmount: "3600",
      },
      {
        id: 3,
        buyToken: GNO,
        daysAmount: 60,
        frequency: FREQUENCY_OPTIONS.day,
        sellAmountPerTimeframe: 20,
        sellToken: WXDAI,
        totalSellAmount: "1200",
      },
      {
        id: 4,
        buyToken: WBTC,
        daysAmount: 120,
        frequency: FREQUENCY_OPTIONS.day,
        sellAmountPerTimeframe: 25,
        sellToken: WXDAI,
        totalSellAmount: "3000",
      },
      {
        id: 5,
        buyToken: WETH,
        daysAmount: 30,
        frequency: FREQUENCY_OPTIONS.week,
        sellAmountPerTimeframe: 5,
        sellToken: WXDAI,
        totalSellAmount: "25",
      },
    ],
  },
};
