"use client";

import { useTokenListContext } from "@/context/TokenListContext";
import { Token } from "@/models/token/types";
import {
  BodyText,
  Icon,
  Modal,
  ModalBaseProps,
  ModalContent,
  ModalHeaderTitle,
  RadioButton
} from "@/ui";
import { TokenIcon } from "../TokenIcon";
import { TOKEN_PICKER_COMMON_TOKENS } from "./constants";

interface TokenListRowProps {
  token: Token;
  closeAction: () => void;
}

interface TokenListProps {
  closeAction: () => void;
  tokenList: Token[];
}

export const TokenPicker = ({ isOpen, closeAction }: ModalBaseProps) => {
  const { tokenList } = useTokenListContext();

  return (
    <Modal closeAction={closeAction} isOpen={isOpen}>
      <ModalHeaderTitle closeAction={closeAction} title="Select a token" />
      <ModalContent>
        <SearchBar />
        <CommonTokens />
        <TokenList closeAction={closeAction} tokenList={tokenList} />
      </ModalContent>
    </Modal>
  );
};

const SearchBar = () => (
  <div className="flex items-center bg-surface-50 border border-surface-75 rounded-xl py-2 px-3 text-em-low">
    <Icon className="text-em-med" name="search" size={18} />
    <input
      className="outline-none font-semibold flex-grow ml-2 bg-surface-50"
      placeholder="Search token name or paste address"
      type="text"
    />
  </div>
);

const CommonTokens = () => (
  <div className="mt-5">
    <p className="text-xs font-semibold text-em-low">Common tokens</p>
    <div className="flex flex-wrap mt-2 gap-2">
      {TOKEN_PICKER_COMMON_TOKENS.map((token: Token) => (
        <RadioButton
          checked={false}
          id={token.address}
          key={token.address}
          name={token.name}
          onChange={() => {}}
          value={token.name}
        >
          <TokenIcon token={token} />
          <p className="font-semibold ml-1.5">{token.symbol}</p>
        </RadioButton>
      ))}
    </div>
  </div>
);

const TokenListRow = ({ closeAction, token }: TokenListRowProps) => (
  <div
    className="flex justify-between w-full py-2 cursor-pointer hover:bg-surface-50"
    key={token.address}
    onClick={closeAction}
  >
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <TokenIcon token={token} size="md" />
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

const TokenList = ({ closeAction, tokenList }: TokenListProps) => (
  <div
    className="mt-5 overflow-y-auto h-72 border-t border-surface-50 divide-y divide-surface-50"
    id="tokenPickerList"
  >
    {tokenList.map(token => (
      <TokenListRow
        closeAction={closeAction}
        key={token.address}
        token={token}
      />
    ))}
  </div>
);
