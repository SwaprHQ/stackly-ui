"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";

import { ChainId } from "@stackly/sdk";
import {
  createParser,
  Options,
  parseAsString,
  parseAsStringEnum,
  parseAsTimestamp,
  useQueryState,
} from "next-usequerystate";

import { DEFAULT_TOKENS_BY_CHAIN, checkIsValidChainId } from "@/utils";
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

type StackboxFormStateInput<T> = [
  T,
  <Shallow>(
    value: T | ((old: T) => T | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
];

interface StackboxFormContextProps {
  resetFormValues: (newChainId: ChainId) => void;
  stackboxFormState: {
    fromTokenState: StackboxFormStateInput<TokenWithBalance>;
    toTokenState: StackboxFormStateInput<TokenWithBalance>;
    tokenAmountState: StackboxFormStateInput<string>;
    frequencyState: StackboxFormStateInput<FREQUENCY_OPTIONS>;
    startDateState: StackboxFormStateInput<Date>;
    endDateState: StackboxFormStateInput<Date>;
  };
}

const StackboxFormContext = createContext<StackboxFormContextProps>({
  resetFormValues: throwStackboxFormContextError,
  stackboxFormState: null as any,
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
    const validChainId = checkIsValidChainId(chainId)
      ? chainId
      : ChainId.GNOSIS;

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
      const validChainId = checkIsValidChainId(newChainId)
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
      fromTokenState: [
        fromToken,
        setFromToken,
      ] as StackboxFormStateInput<TokenWithBalance>,
      toTokenState: [
        toToken,
        setToToken,
      ] as StackboxFormStateInput<TokenWithBalance>,
      tokenAmountState: [
        tokenAmount,
        setTokenAmount,
      ] as StackboxFormStateInput<string>,
      frequencyState: [
        frequency,
        setFrequency,
      ] as StackboxFormStateInput<FREQUENCY_OPTIONS>,
      startDateState: [
        startDateTime,
        setStartDateTime,
      ] as StackboxFormStateInput<Date>,
      endDateState: [
        endDateTime,
        setEndDateTime,
      ] as StackboxFormStateInput<Date>,
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
