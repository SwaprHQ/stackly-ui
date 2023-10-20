import { TokenIcon, TokenLogoSize } from "@/components/TokenIcon";
import { Token } from "@/models/token";

interface TokenLogoPairProps {
  buyToken: Token;
  buyTokenSize?: TokenLogoSize;
  sellToken: Token;
  sellTokenSize?: TokenLogoSize;
}

export const TokenLogoPair = ({
  buyToken,
  buyTokenSize = "lg",
  sellToken,
  sellTokenSize = "xs",
}: TokenLogoPairProps) => (
  <div className="flex items-end">
    <TokenIcon token={buyToken} size={buyTokenSize} />
    <TokenIcon token={sellToken} size={sellTokenSize} className="-ml-2" />
  </div>
);
