"use client";

import { BodyText, Button, Icon, RadioButton, TitleText } from "@/ui";
import { useState } from "react";
import { ConfirmStackModal } from "./ConfirmStackModal";
import { TokenPicker, DatePicker } from "@/components";

export const Stackbox = () => {
  const [isConfirmStackOpen, setConfirmStackIsOpen] = useState(false);
  const [isTokenPickerOpen, setTokenPickerIsOpen] = useState(false);

  const [frequency, setFrequency] = useState<string>("0");

  const [startDateTime, setStartDateTime] = useState<Date>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date>(new Date());

  const openConfirmStack = () => setConfirmStackIsOpen(true);
  const closeConfirmStack = () => setConfirmStackIsOpen(false);

  const openTokenPicker = () => setTokenPickerIsOpen(true);
  const closeTokenPicker = () => setTokenPickerIsOpen(false);

  return (
    <div>
      <div className="max-w-lg mx-auto my-24 bg-white shadow-2xl rounded-2xl">
        <div className="px-5 py-4 border shadow-lg border-surface-50 rounded-2xl">
          <div className="flex items-end justify-between pb-4 border-b border-surface-50">
            <div className="space-y-2">
              <BodyText className="text-em-low">Deposit from</BodyText>
              <Button action="secondary" size="sm" onClick={openTokenPicker}>
                select token
              </Button>
            </div>
            <div className="flex items-center justify-center p-2 w-14 bg-surface-50 rounded-2xl">
              <Icon name="arrow-left" className="rotate-180" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-em-low">To receive in</p>
              <Button action="secondary" size="sm" onClick={openTokenPicker}>
                select token
              </Button>
            </div>
          </div>
          <div className="py-2">
            <input
              type="number"
              placeholder="0.0"
              className="w-full py-3 text-4xl font-semibold outline-none"
            />
          </div>
        </div>
        <div className="px-5 py-6 space-y-6">
          <div className="space-y-2">
            <TitleText weight="bold" className="text-em-med">
              Stack WETH every
            </TitleText>
            <div className="space-y-6">
              <div className="flex space-x-2">
                <RadioButton
                  name="hour"
                  id="hour"
                  checked={frequency === "0"}
                  value={"0"}
                  onChange={(event) => setFrequency(event.target.value)}
                >
                  <BodyText size={2}>Hour</BodyText>
                </RadioButton>
                <RadioButton
                  name="day"
                  id="day"
                  checked={frequency === "1"}
                  value={"1"}
                  onChange={(event) => setFrequency(event.target.value)}
                >
                  <BodyText size={2}>Day</BodyText>
                </RadioButton>
                <RadioButton
                  name="week"
                  id="week"
                  checked={frequency === "2"}
                  value={"2"}
                  onChange={(event) => setFrequency(event.target.value)}
                >
                  <BodyText size={2}>Week</BodyText>
                </RadioButton>
                <RadioButton
                  name="month"
                  id="month"
                  checked={frequency === "4"}
                  value={"4"}
                  onChange={(event) => setFrequency(event.target.value)}
                >
                  <BodyText size={2}>Month</BodyText>
                </RadioButton>
              </div>
              <div className="flex rounded-2xl border border-surface-50 divide-x divide-surface-50">
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
                  />
                </div>
              </div>
            </div>
          </div>
          <Button width="full" onClick={openConfirmStack}>
            Stack Now
          </Button>
        </div>
      </div>
      <TokenPicker isOpen={isTokenPickerOpen} closeAction={closeTokenPicker} />
      <ConfirmStackModal
        isOpen={isConfirmStackOpen}
        closeAction={closeConfirmStack}
      />
    </div>
  );
};
