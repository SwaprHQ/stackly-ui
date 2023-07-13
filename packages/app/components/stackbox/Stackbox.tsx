"use client";

import {
  BodyText,
  Button,
  ChipButton,
  Icon,
  RadioButton,
  TitleText
} from "@/ui";
import { useRef, useState } from "react";
import { ConfirmStackModal } from "./ConfirmStackModal";
import { TokenPicker } from "@/components/token-picker/TokenPicker";
import { TokenFromTokenlist } from "@/models/token";
import { TokenIcon } from "../TokenIcon";
import { cx } from "class-variance-authority";

const TOKEN_FROM_LABEL = "Deposit from";
const TOKEN_TO_LABEL = "To receive";

interface SelectTokenChipProps {
  label: string;
  onClick: (isTokenFrom?: boolean) => void;
  token?: TokenFromTokenlist;
}

export const Stackbox = () => {
  const [isConfirmStackOpen, setConfirmStackIsOpen] = useState(false);
  const [isTokenPickerOpen, setTokenPickerIsOpen] = useState(false);
  const [isPickingTokenFrom, setIsPickingTokenFrom] = useState<boolean>(false);
  const [tokenFrom, setTokenFrom] = useState<TokenFromTokenlist>();
  const [tokenTo, setTokenTo] = useState<TokenFromTokenlist>();

  const openConfirmStack = () => setConfirmStackIsOpen(true);
  const closeConfirmStack = () => setConfirmStackIsOpen(false);

  const openTokenPicker = (isTokenFrom = true) => {
    setIsPickingTokenFrom(Boolean(isTokenFrom));
    setTokenPickerIsOpen(true);
  };
  const closeTokenPicker = () => setTokenPickerIsOpen(false);

  const searchTokenBarRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="max-w-lg mx-auto my-24 bg-white shadow-2xl rounded-2xl">
        <div className="px-5 py-4 border shadow-lg border-surface-50 rounded-2xl">
          <div className="flex items-end justify-between pb-4 border-b border-surface-50">
            <SelectTokenChip
              label={TOKEN_FROM_LABEL}
              onClick={openTokenPicker}
              token={tokenFrom}
            />
            <Icon
              name="arrow-left"
              className="flex items-center justify-center p-2 w-16 h-9 bg-surface-50 rounded-2xl rotate-180"
            />
            <SelectTokenChip
              label={TOKEN_TO_LABEL}
              onClick={openTokenPicker}
              token={tokenTo}
            />
          </div>
          <div className="py-2">
            <input
              type="number"
              placeholder="0.0"
              className="w-full py-3 text-4xl font-semibold outline-none"
            />
          </div>
        </div>
        <div className="px-5 py-6">
          <div className="space-y-2">
            <TitleText weight="bold" className="text-em-med">
              Stack WETH every
            </TitleText>
            <div className="flex space-x-2">
              <RadioButton
                name="hour"
                id="hour"
                checked={true}
                value={"0"}
                onChange={() => {}}
              >
                Hour
              </RadioButton>
              <RadioButton
                name="week"
                id="week"
                checked={false}
                value={"1"}
                onChange={() => {}}
              >
                Week
              </RadioButton>
              <RadioButton
                name="month"
                id="month"
                checked={false}
                value={"2"}
                onChange={() => {}}
              >
                Month
              </RadioButton>
            </div>
          </div>
          <p className="py-12 mx-auto w-fit text-em-low">The stackbox™</p>
          <Button width="full" onClick={openConfirmStack}>
            Stack Now
          </Button>
        </div>
      </div>
      <TokenPicker
        closeAction={closeTokenPicker}
        initialFocusRef={searchTokenBarRef}
        isOpen={isTokenPickerOpen}
        onTokenSelect={isPickingTokenFrom ? setTokenFrom : setTokenTo}
      />
      <ConfirmStackModal
        isOpen={isConfirmStackOpen}
        closeAction={closeConfirmStack}
      />
    </>
  );
};

const SelectTokenChip = ({ label, onClick, token }: SelectTokenChipProps) => {
  const isTokenFrom = label === TOKEN_FROM_LABEL;
  const handleButtonClick = () => onClick(isTokenFrom);

  return (
    <div
      className={cx("flex flex-col space-y-2", {
        "items-end": !isTokenFrom
      })}
    >
      <BodyText className="text-em-low">{label}</BodyText>
      {token ? (
        <ChipButton id={token.address} onClick={handleButtonClick} size="sm">
          <TokenIcon token={token} />
          <p className="font-semibold ml-1.5">{token.symbol}</p>
        </ChipButton>
      ) : (
        <Button
          action="secondary"
          className="leading-6"
          onClick={handleButtonClick}
          size="sm"
        >
          Select token
        </Button>
      )}
    </div>
  );
};
