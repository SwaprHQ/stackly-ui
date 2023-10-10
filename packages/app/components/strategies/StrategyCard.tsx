"use client";

import { useState } from "react";
import { cx } from "class-variance-authority";

import { Button, CaptionText, Icon } from "@/ui";
import { Strategy, useStrategyContext } from "@/contexts";
import { TokenLogoPair } from "@/components/TokenLogoPair";

import { FREQUENCY_LABEL } from "./constants";

interface StrategyCardProps {
  strategy: Strategy;
}

export const StrategyCard = ({ strategy }: StrategyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedStrategy, setSelectedStrategy, setShouldResetStackbox } =
    useStrategyContext();

  const { buyToken, sellToken } = strategy;

  const strategyTotalDetails = [
    {
      label: "Total Amount",
      totalAmount: `${strategy.totalSellAmount} ${sellToken.symbol}`,
    },
    { label: "No. of days", totalAmount: strategy.daysAmount },
  ];

  const isSelected = selectedStrategy?.id === strategy.id;

  return (
    <div
      className={cx(
        "p-3 bg-white shadow-md min-w-60 rounded-2xl cursor-pointer",
        {
          "!bg-primary-900": isSelected,
          "shadow-lg": isHovered,
        }
      )}
      onClick={() => {
        setSelectedStrategy(isSelected ? null : strategy);
        setShouldResetStackbox(isSelected);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        <TokenLogoPair
          buyToken={buyToken}
          buyTokenSize="sm"
          sellToken={sellToken}
          sellTokenSize="3xs"
        />
        <div
          className={cx("flex items-center ml-2", {
            "text-white": isSelected,
          })}
        >
          <CaptionText>{`${strategy.sellAmountPerTimeframe} ${sellToken.symbol}`}</CaptionText>
          <Icon size={15} className="rotate-180" name="arrow-left" />
          <CaptionText>{`${buyToken.symbol} ${
            FREQUENCY_LABEL[strategy.frequency]
          }`}</CaptionText>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex space-x-6">
          {strategyTotalDetails.map((strategyDetails, index) => (
            <div key={index}>
              <CaptionText
                className={cx("text-em-low", {
                  "text-white opacity-[.48]": isSelected,
                })}
                size={1}
              >
                {strategyDetails.label}
              </CaptionText>
              <CaptionText
                className={cx("text-em-med", {
                  "text-white opacity-[.76]": isSelected,
                })}
              >
                {strategyDetails.totalAmount}
              </CaptionText>
            </div>
          ))}
        </div>
        <Button
          className={cx({ "p-[5px] rounded-md": isSelected })}
          size={isSelected ? "icon" : "xs"}
          variant={isSelected || isHovered ? "primary" : "secondary"}
        >
          {isSelected ? <Icon name="close" size={15} /> : "Select"}
        </Button>
      </div>
    </div>
  );
};
