"use client";

import { useRef, useState } from "react";
import { cx } from "class-variance-authority";

import { BodyText, Button, Icon, RadioButton, TitleText } from "@/ui";
import { ConfirmStackModal, TokenIcon, TokenPicker } from "@/components";
import { TokenFromTokenlist } from "@/models/token";

interface SelectTokenButtonProps {
  label: string;
  onClick: (isTokenFrom?: boolean) => void;
  token?: TokenFromTokenlist;
}

export const Stackbox = () => {
  const searchTokenBarRef = useRef<HTMLInputElement>(null);
  const [isConfirmStackOpen, setConfirmStackIsOpen] = useState(false);
  const [isPickingTokenFrom, setIsPickingTokenFrom] = useState<boolean>(false);
  const [isTokenPickerOpen, setTokenPickerIsOpen] = useState(false);
  const [tokenFrom, setTokenFrom] = useState<TokenFromTokenlist>();
  const [tokenTo, setTokenTo] = useState<TokenFromTokenlist>();

  const closeConfirmStack = () => setConfirmStackIsOpen(false);
  const closeTokenPicker = () => setTokenPickerIsOpen(false);
  const openConfirmStack = () => setConfirmStackIsOpen(true);
  const openTokenPicker = (isTokenFrom = true) => {
    setIsPickingTokenFrom(isTokenFrom);
    setTokenPickerIsOpen(true);
  };
  const selectToken = isPickingTokenFrom ? setTokenFrom : setTokenTo;

  return (
    <>
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
        onTokenSelect={selectToken}
      />
      <ConfirmStackModal
        isOpen={isConfirmStackOpen}
        closeAction={closeConfirmStack}
      />
    </>
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
