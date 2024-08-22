"use client";

import {
  AnimationEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { add, formatDistance } from "date-fns";
import { cx } from "class-variance-authority";
import { formatUnits, parseUnits } from "viem";
import Link from "next/link";
import { trackEvent } from "fathom-client";
import { useAccount, useBalance } from "wagmi";

import {
  BodyText,
  Button,
  CaptionText,
  Icon,
  RadioButton,
  Severity,
  TitleText,
  Toast,
} from "@/ui";
import {
  ConfirmStackModal,
  ConnectButton,
  DatePicker,
  TokenIcon,
  TokenPicker,
} from "@/components";
import { EVENTS } from "@/analytics";
import {
  ModalId,
  TokenWithBalance,
  useModalContext,
  useNetworkContext,
  useStackboxFormContext,
  useStrategyContext,
  useTokenListContext,
} from "@/contexts";
import {
  FREQUENCY_OPTIONS,
  INITAL_ORDER,
  Token,
  frequencySeconds,
} from "@/models";
import { PATHNAMES } from "@/constants";

interface SelectTokenButtonProps {
  label: string;
  onClick: (isFromToken?: boolean) => void;
  token?: TokenWithBalance | null;
  className?: string;
  onAnimationEnd: AnimationEventHandler<HTMLElement>;
}

const START_TIME_MINUTES_OFFSET = 10;
const getDateNowPlus10Mins = () =>
  new Date().setMinutes(new Date().getMinutes() + START_TIME_MINUTES_OFFSET);

const frequencyOptions = [
  { option: FREQUENCY_OPTIONS.hour, name: "Hour" },
  { option: FREQUENCY_OPTIONS.day, name: "Day" },
  { option: FREQUENCY_OPTIONS.week, name: "Week" },
  { option: FREQUENCY_OPTIONS.month, name: "Month" },
];

enum BalanceDivider {
  MAX = 1,
  HALF = 2,
  QUARTER = 4,
}

const balanceOptions = [
  { name: "25%", divider: BalanceDivider.QUARTER },
  { name: "50%", divider: BalanceDivider.HALF },
  { name: "Max", divider: BalanceDivider.MAX },
];

export const Stackbox = () => {
  const searchTokenBarRef = useRef<HTMLInputElement>(null);
  const [isPickingFromToken, setIsPickingFromToken] = useState<boolean>(false);

  const { closeModal, isModalOpen, openModal } = useModalContext();
  const { resetFormValues, stackboxFormState } = useStackboxFormContext();
  const { deselectStrategy, selectedStrategy } = useStrategyContext();
  const {
    tokenList,
    tokenListWithBalances,
    getTokenFromList,
    isLoading: isTokenListLoading,
  } = useTokenListContext();
  const { address, isConnected } = useAccount();
  const { chainId } = useNetworkContext();

  const [fromToken, setFromToken] = stackboxFormState.fromTokenState;
  const [toToken, setToToken] = stackboxFormState.toTokenState;
  const [tokenAmount, setTokenAmount] = stackboxFormState.tokenAmountState;
  const [frequency, setFrequency] = stackboxFormState.frequencyState;
  const [startDateTime, setStartDateTime] = stackboxFormState.startDateState;
  const [endDateTime, setEndDateTime] = stackboxFormState.endDateState;

  const [showTokenAmountError, setShowTokenAmountError] = useState(false);
  const [showPastEndDateError, setShowPastEndDateError] = useState(false);
  const [isNearStartDate, setIsNearStartDate] = useState(false);
  const [showFromTokenError, setShowFromTokenError] = useState(false);
  const [showToTokenError, setShowToTokenError] = useState(false);
  const [showInsufficentBalanceError, setShowInsufficentBalanceError] =
    useState(false);

  const { data: balance } = useBalance({
    address: fromToken && address ? address : undefined,
    token: fromToken?.address as `0x${string}`,
    chainId,
  });

  useEffect(() => {
    if (isTokenListLoading) return;

    const searchParams = new URLSearchParams(window.location.search);

    const fromTokenParam = searchParams.get("fromToken");
    if (
      fromTokenParam &&
      fromToken.address.toLowerCase() != fromTokenParam.toLowerCase()
    ) {
      setFromToken(getTokenFromList(fromTokenParam));
    }

    const toTokenParam = searchParams.get("toToken");
    if (
      toTokenParam &&
      toToken.address.toLowerCase() != toTokenParam.toLowerCase()
    ) {
      setToToken(getTokenFromList(toTokenParam));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenListLoading]);

  /**
   * Form state handler when we select a
   * strategy
   */
  useEffect(() => {
    if (selectedStrategy) {
      const getStrategyToken = (strategyToken: Token) => {
        const tokenListToIterate =
          address && isConnected && tokenListWithBalances
            ? tokenListWithBalances
            : tokenList;

        return (
          tokenListToIterate.find(
            (token) =>
              token.address.toUpperCase() ===
              strategyToken.address.toUpperCase()
          ) ?? null
        );
      };

      const strategyEndDate = add(Date.now(), {
        days: selectedStrategy.daysAmount,
      });
      const strategyFromToken = getStrategyToken(selectedStrategy.sellToken);
      const strategyToToken = getStrategyToken(selectedStrategy.buyToken);

      setFromToken(strategyFromToken);
      setToToken(strategyToToken);
      setTokenAmount(selectedStrategy.totalSellAmount);
      setFrequency(selectedStrategy.frequency);
      setStartDateTime(new Date(Date.now()));
      setEndDateTime(new Date(strategyEndDate));
    }
  }, [
    address,
    chainId,
    frequency,
    isConnected,
    selectedStrategy,
    setEndDateTime,
    setFrequency,
    setFromToken,
    setStartDateTime,
    setToToken,
    setTokenAmount,
    tokenList,
    tokenListWithBalances,
  ]);

  const openTokenPicker = (isFromToken = true) => {
    setIsPickingFromToken(isFromToken);
    openModal(ModalId.TOKEN_PICKER);
  };

  const openConfirmStack = useCallback(() => {
    const startDate = startDateTime.getTime();
    const endDate = endDateTime.getTime();
    const isEndTimeBeforeStartTime = endDate <= startDate;
    const isStartTimeNearNow = startDate <= getDateNowPlus10Mins();
    const isTokenAmountZero = tokenAmount === "0";

    setShowPastEndDateError(isEndTimeBeforeStartTime);
    setIsNearStartDate(isStartTimeNearNow);

    if (!fromToken || !toToken) {
      if (!fromToken) setShowFromTokenError(true);
      if (!toToken) setShowToTokenError(true);
      return;
    }

    if (!tokenAmount) {
      setShowTokenAmountError(true);

      return;
    }

    if (
      fromToken &&
      balance &&
      tokenAmount &&
      BigInt(balance.value) < parseUnits(tokenAmount, fromToken.decimals)
    ) {
      setShowInsufficentBalanceError(true);
      return;
    }

    if (
      fromToken &&
      toToken &&
      tokenAmount &&
      !isEndTimeBeforeStartTime &&
      !isTokenAmountZero &&
      balance &&
      BigInt(balance.value) >= parseUnits(tokenAmount, fromToken.decimals)
    ) {
      setShowInsufficentBalanceError(false);
      openModal(ModalId.CONFIRM_STACK);
      trackEvent(EVENTS.CREATE_FLOW.STACKBOX_CONFIRM_CLICK);
    }
  }, [
    balance,
    endDateTime,
    fromToken,
    openModal,
    startDateTime,
    toToken,
    tokenAmount,
  ]);

  const selectToken = (selectedToken: TokenWithBalance) => {
    deselectStrategy();

    const setSelectedToken = isPickingFromToken ? setFromToken : setToToken;
    const setOppositeToken = isPickingFromToken ? setToToken : setFromToken;
    const oppositeToken = isPickingFromToken ? toToken : fromToken;
    const previousToken = isPickingFromToken ? fromToken : toToken;

    setSelectedToken(selectedToken);

    if (oppositeToken === selectedToken) setOppositeToken(previousToken);
  };

  const formattedBalance = (balanceData: NonNullable<typeof balance>) => {
    const SIGNIFICANT_DIGITS = 5;

    /* parseFloat has limitations with big numbers, if number is too big it only shows part of it */
    const valueFloat = parseFloat(balanceData.formatted);
    const [integer] = balanceData.formatted.split(".");

    const significantDigits =
      integer === "0"
        ? SIGNIFICANT_DIGITS
        : integer.length + SIGNIFICANT_DIGITS;

    let valueString = "0";

    if (valueFloat !== 0)
      valueString = valueFloat.toLocaleString(undefined, {
        maximumSignificantDigits: significantDigits,
      });

    return valueString;
  };

  const setTokenAmountBasedOnBalance = (divider: number) => {
    if (!balance || !fromToken) return;
    deselectStrategy();

    setShowTokenAmountError(false);
    setShowInsufficentBalanceError(false);

    let formattedBalance = formatUnits(
      balance.value / BigInt(divider),
      fromToken.decimals
    );

    if (divider != BalanceDivider.MAX) {
      formattedBalance = Number(formattedBalance).toFixed(6);
    }

    setTokenAmount(formattedBalance);
  };

  const handleStartDateTimeChange = (newDateTime: Date) => {
    deselectStrategy();

    const newStartDate =
      newDateTime.getTime() <= Date.now() ? new Date(Date.now()) : newDateTime;

    setStartDateTime(newStartDate);
  };

  const estimatedNumberOfOrders =
    Math.floor(
      (endDateTime.getTime() - startDateTime.getTime()) /
        frequencySeconds[frequency as FREQUENCY_OPTIONS]
    ) + INITAL_ORDER;

  const amountPerOrder = (
    parseFloat(tokenAmount) / estimatedNumberOfOrders
  ).toFixed(2);

  const isStrategySelected = Boolean(selectedStrategy);

  const swapFromToTokens = () => {
    setToToken(fromToken);
    setFromToken(toToken);
  };

  return (
    <div
      className={cx("max-w-lg mx-auto bg-white shadow-2xl rounded-2xl", {
        "outline outline-2 outline-primary-200": isStrategySelected,
      })}
    >
      <div className="py-4 border shadow-lg border-surface-50 rounded-2xl">
        <div className="flex items-end justify-between px-5 pb-4 border-b border-surface-50">
          <SelectTokenButton
            label="Deposit from"
            onClick={openTokenPicker}
            token={fromToken}
            className={cx("min-w-[32px]", {
              "animate-wiggle": showFromTokenError,
            })}
            onAnimationEnd={() => {
              setShowFromTokenError(false);
            }}
          />
          <Button
            onClick={swapFromToTokens}
            size="icon"
            variant="secondary"
            iconLeft="arrow-left"
            className="w-10 rotate-180 md:w-16 h-9 rounded-2xl"
          />
          <SelectTokenButton
            label="To receive"
            onClick={openTokenPicker}
            token={toToken}
            className={cx("min-w-[32px]", {
              "animate-wiggle": showToTokenError,
            })}
            onAnimationEnd={() => {
              setShowToTokenError(false);
            }}
          />
        </div>
        <div className="px-5 py-2">
          <input
            min={0}
            type="number"
            pattern="\d*"
            inputMode="decimal"
            placeholder="0.0"
            className={cx(
              "w-full py-3 text-4xl font-semibold outline-none text-em-med text-ellipsis",
              {
                "animate-wiggle-alert bg-transparent placeholder:text-current text-gray-400":
                  showTokenAmountError,
              }
            )}
            value={tokenAmount}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            onChange={(event) => {
              deselectStrategy();
              setShowTokenAmountError(false);
              setShowInsufficentBalanceError(false);
              setTokenAmount(event.target.value);
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === "red-alert")
                setShowTokenAmountError(false);
            }}
          />
          {fromToken && balance && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex space-x-1">
                {balanceOptions.map(({ name, divider }) => (
                  <Button
                    key={name}
                    variant="secondary"
                    width="fit"
                    size="xs"
                    onClick={() => setTokenAmountBasedOnBalance(divider)}
                  >
                    {name}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <TokenIcon token={fromToken} size="2xs" />
                <div className="flex items-center space-x-1">
                  <BodyText className="flex items-center text-em-low">
                    Balance:
                  </BodyText>
                  <button
                    className="hover:underline"
                    onClick={() =>
                      setTokenAmountBasedOnBalance(BalanceDivider.MAX)
                    }
                  >
                    <BodyText>{formattedBalance(balance)}</BodyText>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-5 py-6 space-y-6">
        <div className="space-y-2">
          <TitleText weight="bold" className="text-em-med">
            {toToken ? `Stack ${toToken?.symbol} every` : "Stack every"}
          </TitleText>
          <div className="space-y-4 lg:space-y-6">
            <div className="flex space-x-2">
              {frequencyOptions.map(({ option, name }) => {
                const isSelected = frequency === option;
                return (
                  <RadioButton
                    key={option}
                    name={option}
                    id={option}
                    checked={isSelected}
                    value={option}
                    onChange={(event) => {
                      deselectStrategy();
                      setFrequency(event.target.value as FREQUENCY_OPTIONS);
                    }}
                  >
                    <BodyText
                      size={2}
                      className={!isSelected ? "text-em-med" : ""}
                    >
                      {name}
                    </BodyText>
                  </RadioButton>
                );
              })}
            </div>
            <div className="space-y-1">
              <div className="flex flex-col border divide-y md:divide-y-0 md:flex-row rounded-2xl border-surface-50 md:divide-x divide-surface-50">
                <div className="flex flex-col w-full py-2 pl-4 pr-3 space-y-2 lg:py-3 hover:bg-surface-25">
                  <BodyText size={2}>Starting from</BodyText>
                  <DatePicker
                    dateTime={startDateTime}
                    setDateTime={handleStartDateTimeChange}
                    timeCaption="Start time"
                    className="w-full"
                  />
                </div>
                <div
                  className={cx(
                    "flex flex-col w-full pl-4 pr-3 py-2 lg:py-3 space-y-2 hover:bg-surface-25",
                    {
                      "!border !border-danger-200 !rounded-r-2xl":
                        showPastEndDateError,
                    }
                  )}
                >
                  <BodyText size={2}>Until</BodyText>
                  <DatePicker
                    dateTime={endDateTime}
                    setDateTime={(date: Date) => {
                      const isEndTimeBeforeStartTime =
                        date.getTime() <= startDateTime.getTime();

                      setShowPastEndDateError(isEndTimeBeforeStartTime);
                      deselectStrategy();
                      setEndDateTime(date);
                    }}
                    timeCaption="End time"
                    className="w-full"
                    fromDate={startDateTime}
                  />
                </div>
              </div>
              {showPastEndDateError && (
                <div className="flex items-center space-x-1 text-danger-500">
                  <Icon name="warning" size={12} />
                  <BodyText size={1}>
                    Please select an end time after start time.
                  </BodyText>
                </div>
              )}
            </div>
          </div>
        </div>
        {fromToken &&
          toToken &&
          tokenAmount &&
          parseFloat(tokenAmount) > 0 &&
          endDateTime > startDateTime && (
            <div
              className={cx(
                "p-2 text-center bg-surface-25 text-em-low rounded-xl",
                {
                  "!bg-primary-50 flex items-center justify-between pr-3":
                    isStrategySelected,
                }
              )}
            >
              {isStrategySelected ? (
                <>
                  <div className="flex">
                    <Icon className="mr-2" name="sparkles" size={14} />
                    <StackDetailsTileText
                      amountPerOrder={amountPerOrder}
                      frequency={
                        FREQUENCY_OPTIONS[frequency as FREQUENCY_OPTIONS]
                      }
                      toTokenSymbol={toToken.symbol}
                      fromTokenSymbol={fromToken.symbol}
                      timeLength={formatDistance(endDateTime, startDateTime)}
                    />
                  </div>
                  <Button
                    className="text-primary-800"
                    onClick={() => {
                      deselectStrategy();
                      resetFormValues(chainId);
                    }}
                    size="xs"
                    variant="caption"
                  >
                    <CaptionText>Reset stack</CaptionText>
                  </Button>
                </>
              ) : (
                <StackDetailsTileText
                  amountPerOrder={amountPerOrder}
                  frequency={FREQUENCY_OPTIONS[frequency as FREQUENCY_OPTIONS]}
                  toTokenSymbol={toToken.symbol}
                  fromTokenSymbol={fromToken.symbol}
                  timeLength={formatDistance(endDateTime, startDateTime)}
                />
              )}
            </div>
          )}
        {address ? (
          <Button
            width="full"
            size="lg"
            onClick={openConfirmStack}
            className={cx({ "animate-wiggle": showInsufficentBalanceError })}
          >
            {showInsufficentBalanceError
              ? "Insufficent Balance"
              : "Confirm Stack"}
          </Button>
        ) : (
          <ConnectButton
            size="lg"
            className="w-full"
            text="Connect Wallet to Stack"
          />
        )}
      </div>
      <TokenPicker
        closeAction={() => closeModal(ModalId.TOKEN_PICKER)}
        initialFocusRef={searchTokenBarRef}
        isOpen={isModalOpen(ModalId.TOKEN_PICKER)}
        onTokenSelect={selectToken}
      />
      {fromToken && toToken && (
        <ConfirmStackModal
          toToken={toToken}
          fromToken={fromToken}
          amount={tokenAmount}
          frequency={frequency}
          startTime={
            isNearStartDate ? new Date(getDateNowPlus10Mins()) : startDateTime
          }
          endTime={endDateTime}
          isOpen={isModalOpen(ModalId.CONFIRM_STACK)}
          closeAction={() => {
            closeModal(ModalId.CONFIRM_STACK);
          }}
          key={`${fromToken.address}-$${tokenAmount}`}
          onSuccess={() => {
            closeModal(ModalId.CONFIRM_STACK);
            openModal(ModalId.SUCCESS_STACK_TOAST);
            trackEvent(EVENTS.CREATE_FLOW.STACK_SUCCESS);
            resetFormValues(chainId);
          }}
        />
      )}
      <Toast
        closeAction={() => closeModal(ModalId.SUCCESS_STACK_TOAST)}
        isOpen={isModalOpen(ModalId.SUCCESS_STACK_TOAST)}
        severity={Severity.SUCCESS}
        title="Your stack creation was successful"
      >
        <Link
          passHref
          className="flex items-center space-x-0.5 hover:border-em-low border-b-2 border-em-disabled group"
          href={PATHNAMES.STACKS}
          onClick={() => closeModal(ModalId.SUCCESS_STACK_TOAST)}
        >
          <BodyText className="text-em-med">View your stacks</BodyText>
        </Link>
      </Toast>
    </div>
  );
};

const SelectTokenButton = ({
  label,
  onClick,
  token,
  className,
  onAnimationEnd,
}: SelectTokenButtonProps) => {
  const isFromToken = label.toLowerCase().includes("deposit");
  const handleButtonClick = () => onClick(isFromToken);

  return (
    <div
      className={cx("flex flex-col space-y-2 min-w-[125px]", {
        "items-end": !isFromToken,
      })}
    >
      <BodyText className="text-em-low">{label}</BodyText>
      {token ? (
        <Button variant="secondary" onClick={handleButtonClick}>
          <div className="flex items-center space-x-2">
            <TokenIcon size="xs" token={token} />
            <BodyText>{token.symbol}</BodyText>
            <Icon name="caret-down" size={18} />
          </div>
        </Button>
      ) : (
        <Button
          variant="secondary"
          className={className}
          onClick={handleButtonClick}
          onAnimationEnd={onAnimationEnd}
        >
          Select token
        </Button>
      )}
    </div>
  );
};

interface StackDetailsTileTextProps {
  amountPerOrder: string;
  frequency: string;
  toTokenSymbol: string;
  fromTokenSymbol: string;
  timeLength: string;
}
const StackDetailsTileText = ({
  amountPerOrder,
  frequency,
  toTokenSymbol,
  fromTokenSymbol,
  timeLength,
}: StackDetailsTileTextProps) => (
  <BodyText size={1}>
    Stacks <span className="text-em-med">{toTokenSymbol}</span>, swapping{" "}
    <span className="text-em-med">
      {amountPerOrder} {fromTokenSymbol}
    </span>
    , <span className="text-em-med">every {frequency}</span> for{" "}
    <span className="text-em-med">{timeLength}</span>
  </BodyText>
);
