import { Order, Token, totalFundsUsed } from "@/models/order";
import { totalStacked } from "@/components/StacksTable";
import { Icon, TitleText } from "@/ui";

interface FromToStackTokenPairProps {
  order?: Order;
  fromToken?: Token;
  toToken?: Token;
}

export const FromToStackTokenPair = ({
  fromToken,
  toToken,
  order,
}: FromToStackTokenPairProps) => (
  <div className="flex items-center space-x-4 rounded-3xl w-fit">
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 rounded-full bg-primary-100"></div>
      <TitleText>
        {order ? totalFundsUsed(order).toFixed(2) : fromToken?.symbol}
      </TitleText>
    </div>
    <div className="p-1 rounded-xl md:rounded-2xl md:p-2 bg-surface-75">
      <Icon size={20} className="rotate-180" name="arrow-left" />
    </div>
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 rounded-full bg-primary-100"></div>
      <TitleText>
        {order ? totalStacked(order).toFixed(4) : toToken?.symbol}
      </TitleText>
    </div>
  </div>
);
