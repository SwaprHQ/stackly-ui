import {
  stackHasRemainingFunds,
  StackOrderProps,
  totalStackOrdersDone,
} from "@/models/stack-order";
import React, { useRef, useEffect } from "react";

const FULL_BAR_WIDTH = 100;

export const OrdersProgressBar = ({ stackOrder }: StackOrderProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const totalOrders = stackOrder.orderSlots.length
    ? stackOrder.orderSlots.length
    : 1;

  useEffect(() => {
    if (progressBarRef.current) {
      const width = stackHasRemainingFunds(stackOrder)
        ? (FULL_BAR_WIDTH * totalStackOrdersDone(stackOrder)) / totalOrders
        : FULL_BAR_WIDTH;
      progressBarRef.current.style.width = `${width}%`;
    }
  }, [stackOrder, totalOrders]);

  return (
    <div className="w-full h-2 rounded-lg bg-surface-75">
      <div ref={progressBarRef} className="h-2 rounded-lg bg-primary-500"></div>
    </div>
  );
};
