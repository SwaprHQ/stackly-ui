"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";

import { ChainId } from "@stackly/sdk";
import {
  createParser,
  parseAsString,
  parseAsStringEnum,
  parseAsTimestamp,
  useQueryState,
} from "next-usequerystate";

import { DEFAULT_TOKENS_BY_CHAIN, getIsValidChainId } from "@/utils";
import { FREQUENCY_OPTIONS } from "@/models/stack";
import {
  TokenWithBalance,
  useNetworkContext,
  useStrategyContext,
  useTokenListContext,
} from "@/contexts";

const endDateByFrequency: Record<string, number> = {
  [FREQUENCY_OPTIONS.hour]: new Date().setDate(new Date().getDate() + 2),
  [FREQUENCY_OPTIONS.day]: new Date().setMonth(new Date().getMonth() + 1),
  [FREQUENCY_OPTIONS.week]: new Date().setMonth(new Date().getMonth() + 3),
  [FREQUENCY_OPTIONS.month]: new Date().setFullYear(
    new Date().getFullYear() + 1
  ),
};

const startDateParseAsTimestamp = createParser({
  parse: (v) => {
    const ms = parseInt(v);
    if (Number.isNaN(ms)) {
      return null;
    }

    const searchParamsStartDate = new Date(ms);
    const nowDate = new Date();

    if (nowDate.getTime() > searchParamsStartDate.getTime()) return nowDate;

    return new Date(ms);
  },
  serialize: (v: Date) => v.valueOf().toString(),
});

const throwStackboxFormContextError = () => {
  throw new Error("No StackboxFormContext available");
};

interface StackboxFormContextProps {
  resetFormValues: (newChainId: ChainId) => void;
  stackboxFormState: any;
}

const StackboxFormContext = createContext<StackboxFormContextProps>({
  resetFormValues: throwStackboxFormContextError,
  stackboxFormState: null,
});

interface StackboxFormContextProviderProps {
  children: ReactNode;
}

export const StackboxFormContextProvider = ({
  children,
}: StackboxFormContextProviderProps) => {
  const { chainId } = useNetworkContext();
  const { deselectStrategy } = useStrategyContext();
  const { getTokenFromList } = useTokenListContext();

  const getDefaultParsedToken = (tokenDirection: "to" | "from") => {
    const validChainId = getIsValidChainId(chainId) ? chainId : ChainId.GNOSIS;

    return createParser({
      parse: (address: string) => getTokenFromList(address),
      serialize: (token) => token?.address || "",
    }).withDefault(DEFAULT_TOKENS_BY_CHAIN[validChainId][tokenDirection]);
  };

  const [fromToken, setFromToken] = useQueryState<TokenWithBalance>(
    "fromToken",
    getDefaultParsedToken("from")
  );
  const [toToken, setToToken] = useQueryState<TokenWithBalance>(
    "toToken",
    getDefaultParsedToken("to")
  );
  const [tokenAmount, setTokenAmount] = useQueryState(
    "tokenAmount",
    parseAsString.withDefault("")
  );
  const [frequency, setFrequency] = useQueryState(
    "frequency",
    parseAsStringEnum<FREQUENCY_OPTIONS>(
      Object.values(FREQUENCY_OPTIONS)
    ).withDefault(FREQUENCY_OPTIONS.hour)
  );
  const [startDateTime, setStartDateTime] = useQueryState(
    "startDate",
    startDateParseAsTimestamp.withDefault(new Date(Date.now()))
  );
  const [endDateTime, setEndDateTime] = useQueryState(
    "endDate",
    parseAsTimestamp.withDefault(new Date(endDateByFrequency[frequency]))
  );

  const stackboxFormContext = useMemo(() => {
    const resetFormValues = (newChainId: ChainId) => {
      const validChainId = getIsValidChainId(newChainId)
        ? newChainId
        : ChainId.GNOSIS;

      deselectStrategy();
      setFromToken(DEFAULT_TOKENS_BY_CHAIN[validChainId].from);
      setToToken(DEFAULT_TOKENS_BY_CHAIN[validChainId].to);
      setTokenAmount("0.0");
      setFrequency(FREQUENCY_OPTIONS.hour);
      setStartDateTime(new Date(Date.now()));
      setEndDateTime(new Date(endDateByFrequency[frequency]));
    };

    const stackboxFormState = {
      fromTokenState: [fromToken, setFromToken],
      toTokenState: [toToken, setToToken],
      tokenAmountState: [tokenAmount, setTokenAmount],
      frequencyState: [frequency, setFrequency],
      startDateState: [startDateTime, setStartDateTime],
      endDateState: [endDateTime, setEndDateTime],
    };

    return {
      resetFormValues,
      stackboxFormState,
    };
  }, [
    deselectStrategy,
    endDateTime,
    frequency,
    fromToken,
    setEndDateTime,
    setFrequency,
    setFromToken,
    setStartDateTime,
    setToToken,
    setTokenAmount,
    startDateTime,
    toToken,
    tokenAmount,
  ]);

  return (
    <StackboxFormContext.Provider value={stackboxFormContext}>
      {children}
    </StackboxFormContext.Provider>
  );
};

export const useStackboxFormContext = () => useContext(StackboxFormContext);
