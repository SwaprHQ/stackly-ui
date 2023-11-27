"use client";

import { ChangeEvent, RefObject, forwardRef, useEffect, useState } from "react";

import { ChainId } from "@stackly/sdk";

import {
  BodyText,
  Button,
  ChipButton,
  Icon,
  Modal,
  ModalBaseProps,
  ModalContent,
  ModalHeaderTitle,
} from "@/ui";
import { EmptyStateTokenPickerImg } from "@/public/assets";
import { TokenIcon } from "@/components";
import {
  TokenWithBalance,
  useStackboxFormContext,
  useTokenListContext,
} from "@/contexts";
import { formatTokenValue } from "@/utils/token";
import { TokenFromTokenlist } from "@/models/token";

import { TOKEN_PICKER_COMMON_TOKENS } from "./constants";

const HALF_SECOND = 500;

interface TokenPickerProps extends ModalBaseProps {
  initialFocusRef?: RefObject<HTMLInputElement>;
  onTokenSelect: (token: TokenWithBalance) => void;
}

interface SearchBarProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const TokenPicker = ({
  closeAction,
  initialFocusRef,
  isOpen,
  onTokenSelect,
}: TokenPickerProps) => {
  const [tokenSearchQuery, setTokenSearchQuery] = useState("");
  const [commonTokens, setCommonTokens] = useState<TokenFromTokenlist[]>(
    TOKEN_PICKER_COMMON_TOKENS[ChainId.GNOSIS]
  );
  const [debouncedQuery, setDebouncedQuery] = useState(tokenSearchQuery);

  const { tokenList, tokenListWithBalances } = useTokenListContext();
  const { stackboxFormState } = useStackboxFormContext();
  const [chainId] = stackboxFormState.chainIdState;

  const tokenListSearchCleanup = () => {
    setDebouncedQuery("");
    setTokenSearchQuery("");
  };

  const handleTokenSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDebouncedQuery(event.target.value);
  };

  const handleModalClose = () => {
    if (debouncedQuery) tokenListSearchCleanup();
    closeAction();
  };

  const handleTokenSelect = (token: TokenWithBalance) => {
    onTokenSelect(token);
    handleModalClose();
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

  /**
   * Updates the token common tokens on chain switch
   */
  useEffect(() => {
    if (chainId) setCommonTokens(TOKEN_PICKER_COMMON_TOKENS[chainId]);
  }, [chainId]);

  return (
    <Modal
      closeAction={handleModalClose}
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
    >
      <ModalHeaderTitle closeAction={handleModalClose} title="Select a token" />
      <ModalContent className="px-0 md:px-0">
        <div className="px-4 md:px-6">
          <SearchBar
            ref={initialFocusRef}
            onSearch={handleTokenSearchInput}
            value={debouncedQuery}
          />
          <CommonTokens
            commonTokens={commonTokens}
            onTokenSelect={handleTokenSelect}
          />
        </div>
        <TokenList
          onClearSearch={tokenListSearchCleanup}
          onTokenSelect={handleTokenSelect}
          tokenList={
            tokenListWithBalances?.length ? tokenListWithBalances : tokenList
          }
          tokenSearchQuery={tokenSearchQuery}
        />
      </ModalContent>
    </Modal>
  );
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, value }, ref) => (
    <div className="flex items-center px-3 py-2 border bg-surface-50 border-surface-75 rounded-xl text-em-low">
      <Icon className="text-em-med" name="search" size={18} />
      <input
        className="flex-grow ml-2 text-sm font-semibold outline-none bg-surface-50"
        onChange={onSearch}
        value={value}
        placeholder="Search token name or paste address"
        type="text"
        ref={ref}
      />
    </div>
  )
);
SearchBar.displayName = "Token Picker Search";

interface CommonTokensProps {
  commonTokens: TokenFromTokenlist[];
  onTokenSelect: (token: TokenWithBalance) => void;
}
const CommonTokens = ({ commonTokens, onTokenSelect }: CommonTokensProps) => (
  <div className="mt-5">
    <BodyText className="text-xs font-semibold text-em-low">
      Common tokens
    </BodyText>
    <div className="flex flex-wrap gap-2 mt-2">
      {commonTokens.map((token: TokenWithBalance) => (
        <ChipButton
          id={token.address}
          key={token.address}
          name={token.name}
          onClick={() => onTokenSelect(token)}
          size="sm"
        >
          <TokenIcon token={token} />
          <BodyText className="font-semibold ml-1.5">{token.symbol}</BodyText>
        </ChipButton>
      ))}
    </div>
  </div>
);

interface TokenListProps {
  onClearSearch: () => void;
  onTokenSelect: (token: TokenWithBalance) => void;
  tokenList?: TokenFromTokenlist[] | TokenWithBalance[];
  tokenSearchQuery?: string;
}
const TokenList = ({
  onClearSearch,
  onTokenSelect,
  tokenList = [],
  tokenSearchQuery,
}: TokenListProps) => {
  const [filteredTokenList, setFilteredTokenList] =
    useState<TokenWithBalance[]>(tokenList);

  const handleClearSearch = () => {
    onClearSearch();
    setFilteredTokenList(tokenList);
  };

  useEffect(() => {
    if (tokenSearchQuery) {
      const filteredItems = tokenList.filter(
        (token) =>
          token.symbol.toLowerCase().includes(tokenSearchQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(tokenSearchQuery.toLowerCase())
      );

      setFilteredTokenList(filteredItems);
    } else {
      setFilteredTokenList(tokenList);
    }
  }, [tokenList, tokenSearchQuery]);

  return (
    <div className="mt-5 overflow-y-auto border-t divide-y h-72 border-surface-50 divide-surface-50">
      {filteredTokenList.length
        ? filteredTokenList.map((token) => (
            <TokenListRow
              onTokenSelect={onTokenSelect}
              key={token.address}
              token={token}
            />
          ))
        : tokenSearchQuery && (
            <div className="flex flex-col items-center justify-center mt-8 space-y-4">
              <EmptyStateTokenPickerImg />
              <BodyText className="text-center">{`Nothing found for "${tokenSearchQuery}"`}</BodyText>
              <Button variant="secondary" onClick={handleClearSearch} size="md">
                Clear search
              </Button>
            </div>
          )}
    </div>
  );
};

interface TokenListRowProps {
  token: TokenWithBalance;
  onTokenSelect: (token: TokenWithBalance) => void;
}
const TokenListRow = ({ onTokenSelect, token }: TokenListRowProps) => (
  <div
    className="flex items-center justify-between w-full h-16 px-4 cursor-pointer hover:bg-surface-50"
    key={token.address}
    onClick={() => onTokenSelect(token)}
  >
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-3">
        <TokenIcon token={token} size="md" />
        <div>
          <BodyText size={2}>{token.symbol}</BodyText>
          <BodyText className="text-em-low" size={1}>
            {token.name}
          </BodyText>
        </div>
      </div>
      {token.balance && (
        <BodyText>
          {token.balance === "0"
            ? token.balance
            : formatTokenValue(token.balance as string)}
        </BodyText>
      )}
    </div>
  </div>
);
