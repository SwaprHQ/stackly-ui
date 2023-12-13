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

const throwStrategyContextError = () => {
  throw new Error("No StrategyContext available");
};

interface StrategyContextProps {
  deselectStrategy: () => void;
  selectedStrategy: Strategy | null;
  setSelectedStrategy: React.Dispatch<React.SetStateAction<Strategy | null>>;
}

const StrategyContext = createContext<StrategyContextProps>({
  deselectStrategy: throwStrategyContextError,
  selectedStrategy: null,
  setSelectedStrategy: throwStrategyContextError,
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

  const strategyContext = useMemo(() => {
    const deselectStrategy = () => {
      if (selectedStrategy) setSelectedStrategy(null);
    };

    return {
      deselectStrategy,
      selectedStrategy,
      setSelectedStrategy,
    };
  }, [selectedStrategy]);

  return (
    <StrategyContext.Provider value={strategyContext}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategyContext = () => useContext(StrategyContext);
