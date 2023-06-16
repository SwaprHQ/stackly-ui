import { OrderProps, totalOrdersDone, totalOrders } from "@/models/order";
import React, { useRef, useEffect } from "react";

export const OrdersProgressBar = ({ order }: OrderProps) => {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      const width = (100 * totalOrdersDone(order)) / totalOrders(order);
      progressBarRef.current.style.width = `${width}%`;
    }
  }, [order]);

  return (
    <div className="w-full h-2 rounded-lg bg-surface-75">
      <div ref={progressBarRef} className="h-2 rounded-lg bg-primary-500"></div>
    </div>
  );
};
