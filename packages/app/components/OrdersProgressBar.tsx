import { StackOrderProps, totalStackOrdersDone } from "@/models/stack-order";
import React, { useRef, useEffect } from "react";

export const OrdersProgressBar = ({ stackOrder }: StackOrderProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const totalOrders = totalStackOrdersDone(stackOrder)
    ? totalStackOrdersDone(stackOrder)
    : stackOrder.orderSlots.length;

  useEffect(() => {
    if (progressBarRef.current) {
      const width = (100 * totalStackOrdersDone(stackOrder)) / totalOrders;
      progressBarRef.current.style.width = `${width}%`;
    }
  }, [stackOrder, totalOrders]);

  return (
    <div className="w-full h-2 rounded-lg bg-surface-75">
      <div ref={progressBarRef} className="h-2 rounded-lg bg-primary-500"></div>
    </div>
  );
};
