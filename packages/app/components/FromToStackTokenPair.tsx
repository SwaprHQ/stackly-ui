import { Order, Token, totalFundsUsed } from "@/models/order";
import { totalStacked } from "@/components/StacksTable";
import { Icon, TitleText } from "@/ui";
import { TokenIcon } from "@/components/TokenIcon";

interface FromToStackTokenPairProps {
  order?: Order;
  fromToken?: Token;
  toToken?: Token;
}

export const FromToStackTokenPair = ({
  fromToken,
  toToken,
  order,
}: FromToStackTokenPairProps) => {
  const token0 = order ? order?.sellToken : fromToken;
  const token1 = order ? order?.buyToken : toToken;

  return (
    <div className="flex items-center space-x-4 rounded-3xl w-fit">
      <div className="flex items-center space-x-2">
        {token0 && <TokenIcon token={token0} size="sm" />}
        <TitleText>
          {order ? totalFundsUsed(order).toFixed(2) : fromToken?.symbol}
        </TitleText>
      </div>
      <div className="p-1 rounded-xl md:rounded-2xl md:p-2 bg-surface-75">
        <Icon size={20} className="rotate-180" name="arrow-left" />
      </div>
      <div className="flex items-center space-x-2">
        {token1 && <TokenIcon token={token1} size="sm" />}
        <TitleText>
          {order ? totalStacked(order).toFixed(4) : toToken?.symbol}
        </TitleText>
      </div>
    </div>
  );
};
