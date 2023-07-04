"use client";

import { BodyText } from "@/ui";
import { TokenIcon } from "../TokenIcon";
import { Token } from "@/models/token/types";

interface TokenPickerListRowProps {
  token: Token;
  closeAction: () => void;
}

export const TokenPickerListRow = ({
  closeAction,
  token
}: TokenPickerListRowProps) => (
  <div
    className="flex justify-between w-full px-6 py-2 cursor-pointer hover:bg-surface-50"
    key={`${token.address}${token.symbol}`}
    onClick={closeAction}
  >
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <TokenIcon token={token} className="w-8 h-8" />
        <div className="flex flex-col">
          <BodyText size={2}>{token.symbol}</BodyText>
          <BodyText className="text-em-low" size={1}>
            {token.name}
          </BodyText>
        </div>
      </div>
      <BodyText>0</BodyText>
    </div>
  </div>
);
