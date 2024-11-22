"use client";

import { ChangeEvent, useEffect, useState } from "react";

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
  const dateNow = new Date();
  const endDateByDefaultFrequency = {
    [FREQUENCY_OPTIONS.hour]: dateNow.setHours(dateNow.getHours() + timeAmount),
    [FREQUENCY_OPTIONS.day]: dateNow.setDate(dateNow.getDate() + timeAmount),
    [FREQUENCY_OPTIONS.week]: dateNow.setDate(
      dateNow.getDate() + timeAmount * 7
    ),
    [FREQUENCY_OPTIONS.month]: dateNow.setMonth(
      dateNow.getMonth() + timeAmount
    ),
  };

  return new Date(endDateByDefaultFrequency[frequency]);
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
  const [placeholder, setPlaceholder] = useState("");

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
    const placeholderText = `Custom ${frequency} (max: ${
      maxCustomFrequencies[frequency]
    } ${getCroppedFrequency(frequency)})`;

    setDefaultFrequency(defaultFrequencyOptions[frequency][0]);
    setPlaceholder(placeholderText);
  }, [frequency]);

  useEffect(() => {
    const newFrequency = customFrequency ? customFrequency : defaultFrequency;

    setEndDate(getEndDateByDefaultFrequency(frequency, Number(newFrequency)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFrequency, customFrequency]);

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
          {defaultFrequencyOptions[frequency].map((freqOption, idx) => {
            const isSelected = defaultFrequency === freqOption;

            return (
              <RadioButton
                checked={isSelected}
                className="min-w-[70px] h-10"
                id={freqOption}
                key={idx}
                name={freqOption}
                onChange={(event) => {
                  setDefaultFrequency(event.target.value as FREQUENCY_OPTIONS);
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
