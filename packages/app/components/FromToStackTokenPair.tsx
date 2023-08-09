import { Icon, TitleText } from "@/ui";
import { TokenIcon } from "@/components/TokenIcon";
import { Token } from "@/models/token/types";

interface FromToStackTokenPairProps {
  fromToken: Token;
  toToken: Token;
  fromText: string;
  toText: string;
}

export const FromToStackTokenPair = ({
  fromToken,
  fromText,
  toToken,
  toText,
}: FromToStackTokenPairProps) => (
  <div className="flex items-center space-x-4 rounded-3xl w-fit">
    <div className="flex items-center space-x-2">
      <TokenIcon token={fromToken} />
      <TitleText>{fromText}</TitleText>
    </div>
    <div className="p-1 rounded-xl md:rounded-2xl md:p-2 bg-surface-75">
      <Icon size={20} className="rotate-180" name="arrow-left" />
    </div>
    <div className="flex items-center space-x-2">
      <TokenIcon token={toToken} />
      <TitleText>{toText}</TitleText>
    </div>
  </div>
);
