"use client";

import { FREQUENCY_OPTIONS } from "@/models/stack";
import { Token } from "@/models/token";
import { createContext, useContext, ReactNode, useMemo, useState } from "react";

export type Strategy = {
  id: number;
  buyToken: Token;
  daysAmount: number;
  frequency: FREQUENCY_OPTIONS;
  sellAmountPerTimeframe: number;
  sellToken: Token;
  totalSellAmount: string;
};

interface StrategyContextProps {
  selectedStrategy: Strategy | null;
  setSelectedStrategy: React.Dispatch<React.SetStateAction<Strategy | null>>;
}

const StrategyContext = createContext<StrategyContextProps>({
  selectedStrategy: null,
  setSelectedStrategy: () => {
    throw new Error("No StrategyContext available");
  },
});

interface StrategyContextProviderProps {
  children: ReactNode;
}

export const StrategyContextProvider = ({
  children,
}: StrategyContextProviderProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null
  );

  const strategyContext = useMemo(
    () => ({
      selectedStrategy,
      setSelectedStrategy,
    }),
    [selectedStrategy]
  );

  return (
    <StrategyContext.Provider value={strategyContext}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategyContext = () => useContext(StrategyContext);
