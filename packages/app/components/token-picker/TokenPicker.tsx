"use client";

import { useTokenListContext } from "@/context/TokenListContext";
import { Token } from "@/models/token/types";
import {
  BodyText,
  Button,
  Icon,
  Modal,
  ModalBaseProps,
  ModalContent,
  ModalHeaderTitle,
  RadioButton
} from "@/ui";
import { ChangeEvent, useEffect, useState } from "react";
import { TokenIcon } from "../TokenIcon";
import { TOKEN_PICKER_COMMON_TOKENS } from "./constants";
import EmptyStateImg from "public/assets/images/empty-state-stacks-coins.svg";

const HALF_SECOND = 500;

interface SearchBarProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
interface TokenListRowProps {
  token: Token;
  closeAction: () => void;
}

interface TokenListProps {
  closeAction: () => void;
  onClearSearchClick: () => void;
  tokenList: Token[];
  tokenSearchQuery?: string;
}

export const TokenPicker = ({ isOpen, closeAction }: ModalBaseProps) => {
  const [tokenSearchQuery, setTokenSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(tokenSearchQuery);

  const { tokenList } = useTokenListContext();

  const tokenListClearSearchCleanup = () => {
    setDebouncedQuery("");
    setTokenSearchQuery("");
  };

  const handleTokenSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDebouncedQuery(event.target.value);
  };

  /**
   * Updates the token query value after 0.5s from the last
   * keystroke of 'debouncedTerm'
   */
  useEffect(() => {
    const timer = setTimeout(
      () => setTokenSearchQuery(debouncedQuery),
      HALF_SECOND
    );

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  return (
    <Modal closeAction={closeAction} isOpen={isOpen}>
      <ModalHeaderTitle closeAction={closeAction} title="Select a token" />
      <ModalContent>
        <SearchBar onSearch={handleTokenSearchInput} value={debouncedQuery} />
        <CommonTokens />
        <TokenList
          closeAction={closeAction}
          onClearSearchClick={tokenListClearSearchCleanup}
          tokenList={tokenList}
          tokenSearchQuery={tokenSearchQuery}
        />
      </ModalContent>
    </Modal>
  );
};

const SearchBar = ({ onSearch, value }: SearchBarProps) => (
  <div className="flex items-center bg-surface-50 border border-surface-75 rounded-xl py-2 px-3 text-em-low">
    <Icon className="text-em-med" name="search" size={18} />
    <input
      className="outline-none font-semibold flex-grow ml-2 bg-surface-50"
      onChange={onSearch}
      value={value}
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

const TokenList = ({
  closeAction,
  onClearSearchClick,
  tokenList,
  tokenSearchQuery
}: TokenListProps) => {
  const [filteredTokenList, setFilteredTokenList] = useState<Token[]>(
    tokenList
  );

  const handleClearSearchClick = () => {
    onClearSearchClick();
    setFilteredTokenList(tokenList);
  };

  useEffect(() => {
    if (tokenSearchQuery) {
      const filteredItems = tokenList.filter(
        token =>
          token.symbol.toLowerCase().includes(tokenSearchQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(tokenSearchQuery.toLowerCase())
      );

      setFilteredTokenList(filteredItems);
    } else {
      setFilteredTokenList(tokenList);
    }
  }, [tokenList, tokenSearchQuery]);

  return (
    <div className="mt-5 overflow-y-auto h-72 border-t border-surface-50 divide-y divide-surface-50">
      {filteredTokenList.length
        ? filteredTokenList.map(token => (
            <TokenListRow
              closeAction={closeAction}
              key={token.address}
              token={token}
            />
          ))
        : tokenSearchQuery && (
            <div className="flex items-center justify-center flex-col mt-8 space-y-4">
              <EmptyStateImg />
              <BodyText>{`Nothing found for "${tokenSearchQuery}"`}</BodyText>
              <Button
                action="secondary"
                onClick={handleClearSearchClick}
                size="md"
              >
                Clear search
              </Button>
            </div>
          )}
    </div>
  );
};
