"use client";

import { useRef, useState, useEffect } from "react";
import { cx } from "class-variance-authority";

import { BodyText, Button, Icon, RadioButton, TitleText } from "@/ui";
import {
  ConfirmStackModal,
  TokenIcon,
  TokenPicker,
  DatePicker,
} from "@/components";
import { TokenFromTokenlist } from "@/models/token";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { formatUnits } from "viem";
import { ModalId, useModalContext } from "@/contexts";

interface SelectTokenButtonProps {
  label: string;
  onClick: (isTokenFrom?: boolean) => void;
  token?: TokenFromTokenlist;
}

const HOUR_OPTION = "hour";
const DAY_OPTION = "day";
const WEEK_OPTION = "week";
const MONTH_OPTION = "month";

const frequencyOptions = [
  { option: HOUR_OPTION, name: "Hour" },
  { option: DAY_OPTION, name: "Day" },
  { option: WEEK_OPTION, name: "Week" },
  { option: MONTH_OPTION, name: "Month" },
];

const endDateByFrequency: Record<string, number> = {
  [HOUR_OPTION]: new Date().setDate(new Date().getDate() + 2),
  [DAY_OPTION]: new Date().setMonth(new Date().getMonth() + 1),
  [WEEK_OPTION]: new Date().setMonth(new Date().getMonth() + 3),
  [MONTH_OPTION]: new Date().setFullYear(new Date().getFullYear() + 1),
};
const startDateTimeTimestamp = new Date().setMinutes(
  new Date().getMinutes() + 30
);

const balanceOptions = [
  { name: "25%", divider: 4 },
  { name: "50%", divider: 2 },
  { name: "Max", divider: 1 },
];

export const Stackbox = () => {
  const searchTokenBarRef = useRef<HTMLInputElement>(null);
  const [isPickingTokenFrom, setIsPickingTokenFrom] = useState<boolean>(false);
  const [tokenFrom, setTokenFrom] = useState<TokenFromTokenlist>();
  const [tokenTo, setTokenTo] = useState<TokenFromTokenlist>();
  const { closeModal, openModalId, openModal } = useModalContext();

  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: Boolean(tokenFrom) ? address : undefined,
    token: tokenFrom?.address as `0x${string}`,
    chainId: chain?.id,
  });
  const [tokenAmount, setTokenAmount] = useState("");

  const [frequency, setFrequency] = useState<string>(HOUR_OPTION);
  const [startDateTime, setStartDateTime] = useState<Date>(
    new Date(startDateTimeTimestamp)
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    new Date(endDateByFrequency[frequency])
  );

  const openConfirmStack = () => openModal(ModalId.CONFIRM_STACK);
  const openTokenPicker = (isTokenFrom = true) => {
    setIsPickingTokenFrom(isTokenFrom);
    openModal(ModalId.TOKEN_PICKER);
  };
  const selectToken = isPickingTokenFrom ? setTokenFrom : setTokenTo;

  useEffect(() => {
    setEndDateTime(new Date(endDateByFrequency[frequency]));
  }, [frequency]);

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

  return (
    <div className="max-w-lg mx-auto my-24 bg-white shadow-2xl rounded-2xl">
      <div className="px-5 py-4 border shadow-lg border-surface-50 rounded-2xl">
        <div className="flex items-end justify-between pb-4 border-b border-surface-50">
          <SelectTokenButton
            label="Deposit from"
            onClick={openTokenPicker}
            token={tokenFrom}
          />
          <Icon
            name="arrow-left"
            className="flex items-center justify-center p-2 w-16 h-9 bg-surface-50 rounded-2xl rotate-180"
          />
          <SelectTokenButton
            label="To receive"
            onClick={openTokenPicker}
            token={tokenTo}
          />
        </div>
        <div className="py-2">
          <input
            type="number"
            pattern="[0-9]*"
            placeholder="0.0"
            className="w-full py-3 text-4xl text-em-med font-semibold outline-none"
            value={tokenAmount}
            onKeyDown={(evt) =>
              ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
            }
            onChange={(event) => {
              setTokenAmount(event.target.value);
            }}
          />
          {tokenFrom && balance && (
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {balanceOptions.map(({ name, divider }) => (
                  <Button
                    key={name}
                    action="secondary"
                    width="fit"
                    size="xs"
                    onClick={() => {
                      setTokenAmount(
                        formatUnits(
                          balance.value / BigInt(divider),
                          tokenFrom.decimals
                        )
                      );
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-1 items-center">
                <TokenIcon token={tokenFrom} size="2xs" />
                <BodyText className="text-em-high">
                  <span className="text-em-low">Balance:</span>{" "}
                  {formattedBalance(balance)}
                </BodyText>
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
                    onChange={(event) => setFrequency(event.target.value)}
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
            <div className="flex flex-col md:flex-row rounded-2xl border border-surface-50 divide-y md:divide-x divide-surface-50">
              <div className="flex flex-col w-full px-4 py-3 space-y-2">
                <BodyText size={2}>Starting from</BodyText>
                <DatePicker
                  dateTime={startDateTime}
                  setDateTime={setStartDateTime}
                  timeCaption="Start time"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col w-full px-4 py-3 space-y-2">
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
          </div>
        </div>
        <Button width="full" onClick={openConfirmStack}>
          Stack Now
        </Button>
      </div>
      <TokenPicker
        closeAction={closeModal}
        initialFocusRef={searchTokenBarRef}
        isOpen={openModalId === ModalId.TOKEN_PICKER}
        onTokenSelect={selectToken}
      />
      <ConfirmStackModal
        isOpen={openModalId === ModalId.CONFIRM_STACK}
        closeAction={closeModal}
      />
    </div>
  );
};

const SelectTokenButton = ({
  label,
  onClick,
  token,
}: SelectTokenButtonProps) => {
  const isTokenFrom = label.toLowerCase().includes("deposit");
  const handleButtonClick = () => onClick(isTokenFrom);

  return (
    <div
      className={cx("flex flex-col space-y-2", {
        "items-end": !isTokenFrom,
      })}
    >
      <BodyText className="text-em-low">{label}</BodyText>
      {token ? (
        <Button
          action="secondary"
          className="leading-6 rounded-xl"
          onClick={handleButtonClick}
          size="sm"
        >
          <TokenIcon token={token} />
          <BodyText className="font-semibold ml-1.5">{token.symbol}</BodyText>
          <Icon name="caret-down" size={18} />
        </Button>
      ) : (
        <Button
          action="secondary"
          className="leading-6 rounded-xl"
          onClick={handleButtonClick}
          size="sm"
        >
          Select token
        </Button>
      )}
    </div>
  );
};
