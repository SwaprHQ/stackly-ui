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
  selectedStrategy: Strategy | null;
  setSelectedStrategy: React.Dispatch<React.SetStateAction<Strategy | null>>;
  setShouldResetStackbox: React.Dispatch<React.SetStateAction<Boolean>>;
  shouldResetStackbox: Boolean;
}

const StrategyContext = createContext<StrategyContextProps>({
  selectedStrategy: null,
  setSelectedStrategy: throwStrategyContextError,
  setShouldResetStackbox: throwStrategyContextError,
  shouldResetStackbox: false,
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
  const [shouldResetStackbox, setShouldResetStackbox] =
    useState<Boolean>(false);

  const strategyContext = useMemo(
    () => ({
      selectedStrategy,
      setSelectedStrategy,
      setShouldResetStackbox,
      shouldResetStackbox,
    }),
    [selectedStrategy, shouldResetStackbox]
  );

  return (
    <StrategyContext.Provider value={strategyContext}>
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategyContext = () => useContext(StrategyContext);
