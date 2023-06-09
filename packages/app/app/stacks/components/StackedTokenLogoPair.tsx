import { OrderProps } from "@/app/models/order";

export const StackedTokenLogoPair = ({ order }: OrderProps) => (
  <div className="flex items-end">
    <div className="flex items-center justify-center w-10 h-10 text-[10px] border-2 rounded-full border-primary-400 bg-primary-100">
      {order.buyToken.symbol.substring(0, 4)}
    </div>
    <div className="flex items-center justify-center w-5 h-5 -ml-2 text-[8px]  border-primary-400 border rounded-full bg-primary-200">
      {order.sellToken.symbol.substring(2, 5)}
    </div>
  </div>
);
