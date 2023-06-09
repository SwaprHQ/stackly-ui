import { ordersDone, totalOrders } from "@/app/stacks/components/StacksTable";
import { Order } from "@/app/stacks/page";
import React, { useRef, useEffect, useState } from "react";

export const ProgressBar = ({ order }: { order: Order }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      const totalWidth = progressBarRef.current.offsetWidth;
      const width = (totalWidth * ordersDone(order)) / totalOrders(order);
      progressBarRef.current.style.width = `${width}px`;
    }
  }, [order]);

  return (
    <div className="w-full h-2 rounded-lg bg-surface-75">
      <div ref={progressBarRef} className="h-2 rounded-lg bg-primary-500"></div>
    </div>
  );
};
