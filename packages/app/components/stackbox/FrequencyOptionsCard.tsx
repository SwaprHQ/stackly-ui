"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { add } from "date-fns";
import { twMerge } from "tailwind-merge";

import { FREQUENCY_OPTIONS } from "@/models";
import { BodyText, RadioButton, TextInput } from "@/ui";

interface FrequencyOptionsCardProps {
  frequency: FREQUENCY_OPTIONS;
  setEndDate: (date: Date) => void;
}

const defaultFrequencyOptions = {
  [FREQUENCY_OPTIONS.hour]: ["6", "12", "24"],
  [FREQUENCY_OPTIONS.day]: ["7", "15", "30"],
  [FREQUENCY_OPTIONS.week]: ["4", "8", "12"],
  [FREQUENCY_OPTIONS.month]: ["2", "6", "12"],
};
const maxCustomFrequencies = {
  [FREQUENCY_OPTIONS.hour]: 96,
  [FREQUENCY_OPTIONS.day]: 365,
  [FREQUENCY_OPTIONS.week]: 52,
  [FREQUENCY_OPTIONS.month]: 24,
};
const postiveIntegerOnly = /^$|^[0-9]+$/;

const getEndDateByDefaultFrequency = (
  frequency: FREQUENCY_OPTIONS,
  timeAmount: number
) => {
  switch (frequency) {
    case FREQUENCY_OPTIONS.hour:
      return add(new Date(), { hours: timeAmount });
    case FREQUENCY_OPTIONS.day:
      return add(new Date(), { days: timeAmount });
    case FREQUENCY_OPTIONS.week:
      return add(new Date(), { weeks: timeAmount });
    case FREQUENCY_OPTIONS.month:
      return add(new Date(), { months: timeAmount });
    default: {
      console.error("Invalid frequency option", frequency);
      return new Date();
    }
  }
};

const getCroppedFrequency = (frequency: FREQUENCY_OPTIONS) => {
  const isMonthFrequency = frequency === FREQUENCY_OPTIONS.month;

  return isMonthFrequency ? frequency.substring(0, 2) : frequency.charAt(0);
};

export const FrequencyOptionsCard = ({
  frequency,
  setEndDate,
}: FrequencyOptionsCardProps) => {
  const [defaultFrequency, setDefaultFrequency] = useState(
    defaultFrequencyOptions[frequency][0]
  );
  const [customFrequency, setCustomFrequency] = useState("");

  const handleCustomFrequencyChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    const isWithinRange = Number(newValue) <= maxCustomFrequencies[frequency];

    if (postiveIntegerOnly.test(newValue) && isWithinRange) {
      setDefaultFrequency("");
      setCustomFrequency(newValue);
    }
  };

  useEffect(() => {
    setDefaultFrequency(defaultFrequencyOptions[frequency][0]);
  }, [frequency]);

  useEffect(() => {
    const newFrequency = customFrequency ? customFrequency : defaultFrequency;

    setEndDate(getEndDateByDefaultFrequency(frequency, Number(newFrequency)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFrequency, customFrequency]);

  const placeholder = `Custom ${frequency} (max: ${maxCustomFrequencies[frequency]})`;

  return (
    <div
      className={twMerge([
        "flex flex-col p-3 rounded-2xl gap-1",
        "bg-surface-25 border border-surface-50",
      ])}
    >
      <BodyText className="text-em-low">Duration</BodyText>
      <div className="flex gap-2 flex-col md:flex-row">
        <div className="flex gap-2">
          {defaultFrequencyOptions[frequency].map((freqOption) => {
            const isSelected = defaultFrequency === freqOption;

            return (
              <RadioButton
                checked={isSelected}
                className="min-w-[70px] h-10"
                id={freqOption}
                key={freqOption}
                name={freqOption}
                onChange={(event) => {
                  setDefaultFrequency(event.target.value as FREQUENCY_OPTIONS);
                  setCustomFrequency("");
                }}
                value={freqOption}
              >
                <BodyText className={!isSelected ? "text-em-med" : ""} size={2}>
                  {`${freqOption} ${getCroppedFrequency(frequency)}`}
                </BodyText>
              </RadioButton>
            );
          })}
        </div>
        <TextInput
          id="custom-frequency-option"
          min={1}
          onChange={handleCustomFrequencyChange}
          placeholder={placeholder}
          value={customFrequency}
        />
      </div>
    </div>
  );
};
