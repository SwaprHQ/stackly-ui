"use client";

import { cx } from "class-variance-authority";

import { Button, CaptionText, Icon } from "@/ui";
import { Strategy } from "@/contexts";
import { TokenLogoPair } from "@/components/TokenLogoPair";

import { FREQUENCY_LABEL } from "./constants";
import { useState } from "react";

interface StrategyCardProps {
  onClick: (id: number) => void;
  selected?: boolean;
  strategy: Strategy;
}

export const StrategyCard = ({
  onClick,
  selected,
  strategy,
}: StrategyCardProps) => {
  const { buyToken, sellToken } = strategy;
  const [isHovered, setIsHovered] = useState(false);

  const strategyTotalDetails = [
    {
      label: "Total Amount",
      totalAmount: `${strategy.totalSellAmount} ${sellToken.symbol}`,
    },
    { label: "No. of days", totalAmount: strategy.daysAmount },
  ];

  return (
    <div
      className={cx(
        "p-3 bg-white shadow-md min-w-60 rounded-2xl cursor-pointer",
        {
          "!bg-primary-900": selected,
          "shadow-lg": isHovered,
        }
      )}
      onClick={() => onClick(strategy.id)}
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
            "text-white": selected,
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
                  "text-white opacity-[.48]": selected,
                })}
                size={1}
              >
                {strategyDetails.label}
              </CaptionText>
              <CaptionText
                className={cx("text-em-med", {
                  "text-white opacity-[.76]": selected,
                })}
              >
                {strategyDetails.totalAmount}
              </CaptionText>
            </div>
          ))}
        </div>
        <Button
          className={cx({ "p-[5px] rounded-md": selected })}
          size={selected ? "icon" : "xs"}
          variant={selected || isHovered ? "primary" : "secondary"}
        >
          {selected ? <Icon name="close" size={15} /> : "Select"}
        </Button>
      </div>
    </div>
  );
};
