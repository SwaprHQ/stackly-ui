"use client";

import { useRef, useState, useEffect, AnimationEventHandler } from "react";
import { cx } from "class-variance-authority";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import Link from "next/link";
import { formatDistance } from "date-fns";

import {
  BodyText,
  Button,
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
  BetaNFTModal,
} from "@/components";
import { ModalId, useModalContext, TokenWithBalance } from "@/contexts";
import {
  FREQUENCY_OPTIONS,
  INITAL_ORDER,
  frequencySeconds,
} from "@/models/stack";
import {
  getNftWhitelistAddress,
  getWhitelist,
  nftWhitelistBalanceOf,
} from "@stackly/sdk";
import { useEthersSigner } from "@/utils/ethers";
import { SocialConnectButton } from "../SocialConnectButton";

interface SelectTokenButtonProps {
  label: string;
  onClick: (isFromToken?: boolean) => void;
  token?: TokenWithBalance;
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

const endDateByFrequency: Record<string, number> = {
  [FREQUENCY_OPTIONS.hour]: new Date().setDate(new Date().getDate() + 2),
  [FREQUENCY_OPTIONS.day]: new Date().setMonth(new Date().getMonth() + 1),
  [FREQUENCY_OPTIONS.week]: new Date().setMonth(new Date().getMonth() + 3),
  [FREQUENCY_OPTIONS.month]: new Date().setFullYear(
    new Date().getFullYear() + 1
  ),
};

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
  const [fromToken, setFromToken] = useState<TokenWithBalance>();
  const [toToken, setToToken] = useState<TokenWithBalance>();
  const { closeModal, isModalOpen, openModal } = useModalContext();
  const signer = useEthersSigner();

  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: Boolean(fromToken) ? address : undefined,
    token: fromToken?.address as `0x${string}`,
    chainId: chain?.id,
  });
  const [tokenAmount, setTokenAmount] = useState("");

  const [frequency, setFrequency] = useState<FREQUENCY_OPTIONS>(
    FREQUENCY_OPTIONS.hour
  );
  const [startDateTime, setStartDateTime] = useState<Date>(
    new Date(Date.now())
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    new Date(endDateByFrequency[frequency])
  );

  const [showTokenAmountError, setShowTokenAmountError] = useState(false);
  const [showPastEndDateError, setShowPastEndDateError] = useState(false);
  const [isPastStartDate, setIsPastStartDate] = useState(false);
  const [showFromTokenError, setShowFromTokenError] = useState(false);
  const [showToTokenError, setShowToTokenError] = useState(false);
  const [showInsufficentBalanceError, setShowInsufficentBalanceError] =
    useState(false);

  useEffect(() => {
    setEndDateTime(new Date(endDateByFrequency[frequency]));
  }, [frequency]);

  const openTokenPicker = (isFromToken = true) => {
    setIsPickingFromToken(isFromToken);
    openModal(ModalId.TOKEN_PICKER);
  };

  const openConfirmStack = () => {
    const startDate = startDateTime.getTime();
    const endDate = endDateTime.getTime();
    const isEndTimeBeforeStartTime = endDate <= startDate;
    const isStartTimeInThePast = startDate <= Date.now();
    const isTokenAmountZero = tokenAmount === "0";

    setShowPastEndDateError(isEndTimeBeforeStartTime);
    setIsPastStartDate(isStartTimeInThePast);

    if (!fromToken || !toToken) {
      if (!fromToken) setShowFromTokenError(true);
      if (!toToken) setShowToTokenError(true);

      return;
    }

    if (!tokenAmount) setShowTokenAmountError(true);
    if (
      fromToken &&
      balance &&
      tokenAmount &&
      BigInt(balance.value) < parseUnits(tokenAmount, fromToken.decimals)
    )
      setShowInsufficentBalanceError(true);

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
    }
  };

  const selectToken = (selectedToken: TokenWithBalance) => {
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

    setShowTokenAmountError(false);
    setShowInsufficentBalanceError(false);
    setTokenAmount(
      formatUnits(balance.value / BigInt(divider), fromToken.decimals)
    );
  };

  const estimatedNumberOfOrders =
    Math.floor(
      (endDateTime.getTime() - startDateTime.getTime()) /
        frequencySeconds[frequency]
    ) + INITAL_ORDER;

  const amountPerOrder = (
    parseFloat(tokenAmount) / estimatedNumberOfOrders
  ).toFixed(2);

  useEffect(() => {
    if (!isConnected && isModalOpen(ModalId.BETA_NFT_GATEKEEPING))
      closeModal(ModalId.BETA_NFT_GATEKEEPING);
  }, [closeModal, isConnected, isModalOpen]);

  useEffect(() => {
    const getNFTHolder = async () => {
      if (address && chain && signer) {
        const nftWhitelist = getWhitelist(
          getNftWhitelistAddress(chain.id),
          signer
        );
        const nftAmount = await nftWhitelistBalanceOf(nftWhitelist, address);
        if (nftAmount.eq(0)) {
          openModal(ModalId.BETA_NFT_GATEKEEPING);
        }
      }
    };

    if (process.env.NEXT_PUBLIC_ACTIVE_NFT_GATEKEEPING !== "false")
      getNFTHolder();
  }, [address, chain, openModal, signer]);

  return (
    <div className="max-w-lg mx-auto my-24 bg-white shadow-2xl rounded-2xl">
      <div className="py-4 border shadow-lg border-surface-50 rounded-2xl">
        <div className="flex items-end justify-between px-5 pb-4 border-b border-surface-50">
          <SelectTokenButton
            label="Deposit from"
            onClick={openTokenPicker}
            token={fromToken}
            className={cx({ "animate-wiggle": showFromTokenError })}
            onAnimationEnd={() => {
              setShowFromTokenError(false);
            }}
          />
          <Icon
            name="arrow-left"
            className="flex items-center justify-center w-10 p-2 rotate-180 md:w-16 h-9 bg-surface-50 rounded-2xl"
          />
          <SelectTokenButton
            label="To receive"
            onClick={openTokenPicker}
            token={toToken}
            className={cx({ "animate-wiggle": showToTokenError })}
            onAnimationEnd={() => {
              setShowToTokenError(false);
            }}
          />
        </div>
        <div className="px-5 py-2">
          <input
            min={0}
            type="number"
            pattern="[0-9]*"
            placeholder="0.0"
            className={cx(
              "w-full py-3 text-4xl font-semibold outline-none text-em-med",
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
            Stack WETH every
          </TitleText>
          <div className="space-y-6">
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
                    onChange={(event) =>
                      setFrequency(event.target.value as FREQUENCY_OPTIONS)
                    }
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
                <div className="flex flex-col w-full p-3 space-y-2 hover:bg-surface-25">
                  <BodyText size={2}>Starting from</BodyText>
                  <DatePicker
                    dateTime={startDateTime}
                    setDateTime={setStartDateTime}
                    timeCaption="Start time"
                    className="w-full"
                  />
                </div>
                <div
                  className={cx(
                    "flex flex-col w-full p-3 space-y-2 hover:bg-surface-25",
                    {
                      "!border !border-danger-200 !rounded-r-2xl":
                        showPastEndDateError,
                    }
                  )}
                >
                  <BodyText size={2}>Until</BodyText>
                  <DatePicker
                    dateTime={endDateTime}
                    setDateTime={setEndDateTime}
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
        {fromToken && toToken && tokenAmount && tokenAmount > "0" && (
          <div className="p-2 bg-surface-25 text-center text-em-low rounded-xl">
            <BodyText size={1}>
              Stacks <span className="text-em-med">{toToken.symbol}</span>,
              worth{" "}
              <span className="text-em-med">
                {amountPerOrder} {fromToken.symbol}
              </span>
              ,{" "}
              <span className="text-em-med">
                every {FREQUENCY_OPTIONS[frequency]}
              </span>{" "}
              for{" "}
              <span className="text-em-med">
                {formatDistance(endDateTime, startDateTime)}
              </span>
            </BodyText>
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
        <SocialConnectButton
          toToken={toToken}
          fromToken={fromToken}
          amount={tokenAmount}
          frequency={frequency}
          startTime={
            isPastStartDate ? new Date(getDateNowPlus10Mins()) : startDateTime
          }
          endTime={endDateTime}
          key={`${fromToken?.address}-$${tokenAmount}`}
        />
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
            isPastStartDate ? new Date(getDateNowPlus10Mins()) : startDateTime
          }
          endTime={endDateTime}
          isOpen={isModalOpen(ModalId.CONFIRM_STACK)}
          closeAction={() => closeModal(ModalId.CONFIRM_STACK)}
          key={`${fromToken.address}-$${tokenAmount}`}
          onSuccess={() => {
            closeModal(ModalId.CONFIRM_STACK);
            openModal(ModalId.SUCCESS_STACK_TOAST);
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
          href="/stacks"
          onClick={() => closeModal(ModalId.SUCCESS_STACK_TOAST)}
        >
          <BodyText className="text-em-med">View your stacks</BodyText>
        </Link>
      </Toast>
      <BetaNFTModal />
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
      className={cx("flex flex-col space-y-2", {
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
