"use client";

import { Divider } from "@/ui";
import { Token } from "@/models/token/types";
import { TokenPickerListRow } from "./TokenPickerListRow";

interface TokenPickerListProps {
  tokenList: Token[];
  closeAction: () => void;
}

export const TokenPickerList = ({
  closeAction,
  tokenList
}: TokenPickerListProps) => (
  <div className="mt-5 overflow-y-auto border-t h-72 border-surface-50">
    {tokenList.map(token => (
      <>
        <TokenPickerListRow closeAction={closeAction} token={token} />
        <Divider />
      </>
    ))}
  </div>
);
