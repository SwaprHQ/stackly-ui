// @ts-nocheck

import { TokenIcon } from "@/components/TokenIcon";
import { OrderProps } from "@/models/order";

export const StackedTokenLogoPair = ({ order }: OrderProps) => (
  <div className="flex items-end">
    <TokenIcon token={order.buyToken} size="lg" />
    <TokenIcon token={order.sellToken} size="xs" className="-ml-2" />
  </div>
);
