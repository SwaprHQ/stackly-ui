"use client";

import { ChangeEvent, RefObject, forwardRef, useEffect, useState } from "react";
import { useAccount, useBalance, useNetwork } from "wagmi";

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
import { TokenFromTokenlist } from "@/models/token/types";
import { TokenIcon } from "@/components";
import { TOKEN_PICKER_COMMON_TOKENS } from "./constants";
import { useTokenListContext } from "@/contexts";
import { formatTokenValue } from "@/utils/token";

const HALF_SECOND = 500;

interface TokenPickerProps extends ModalBaseProps {
  initialFocusRef?: RefObject<HTMLInputElement>;
  onTokenSelect: (token: TokenFromTokenlist) => void;
}

interface CommonTokensProps {
  onTokenSelect: (token: TokenFromTokenlist) => void;
}

interface SearchBarProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
interface TokenListRowProps {
  token: TokenFromTokenlist;
  onTokenSelect: (token: TokenFromTokenlist) => void;
}

interface TokenListProps {
  onClearSearch: () => void;
  onTokenSelect: (token: TokenFromTokenlist) => void;
  tokenList: TokenFromTokenlist[];
  tokenSearchQuery?: string;
}

const TokenPicker = ({
  closeAction,
  initialFocusRef,
  isOpen,
  onTokenSelect,
}: TokenPickerProps) => {
  const [tokenSearchQuery, setTokenSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(tokenSearchQuery);

  const { tokenList } = useTokenListContext();

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

  const handleTokenSelect = (token: TokenFromTokenlist) => {
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

  return (
    <Modal
      closeAction={handleModalClose}
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
    >
      <ModalHeaderTitle closeAction={handleModalClose} title="Select a token" />
      <ModalContent className="px-0">
        <div className="px-4">
          <SearchBar
            ref={initialFocusRef}
            onSearch={handleTokenSearchInput}
            value={debouncedQuery}
          />
          <CommonTokens onTokenSelect={handleTokenSelect} />
        </div>
        <TokenList
          onClearSearch={tokenListSearchCleanup}
          onTokenSelect={handleTokenSelect}
          tokenList={tokenList}
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

const CommonTokens = ({ onTokenSelect }: CommonTokensProps) => (
  <div className="mt-5">
    <BodyText className="text-xs font-semibold text-em-low">
      Common tokens
    </BodyText>
    <div className="flex flex-wrap gap-2 mt-2">
      {TOKEN_PICKER_COMMON_TOKENS.map((token: TokenFromTokenlist) => (
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

const TokenListRow = ({ onTokenSelect, token }: TokenListRowProps) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: token?.address as `0x$string`,
    chainId: chain?.id,
  });

  const tokenBalance = balance?.formatted;

  if (!tokenBalance) return null;

  return (
    <div
      className="flex justify-between w-full py-2 cursor-pointer hover:bg-surface-50"
      key={token.address}
      onClick={() => onTokenSelect(token)}
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
        <BodyText>
          {tokenBalance === "0"
            ? tokenBalance
            : formatTokenValue(tokenBalance as string)}
        </BodyText>
      </div>
    </div>
  );
};

const TokenList = ({
  onClearSearch,
  onTokenSelect,
  tokenList,
  tokenSearchQuery,
}: TokenListProps) => {
  const [filteredTokenList, setFilteredTokenList] =
    useState<TokenFromTokenlist[]>(tokenList);

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
              <BodyText>{`Nothing found for "${tokenSearchQuery}"`}</BodyText>
              <Button variant="secondary" onClick={handleClearSearch} size="md">
                Clear search
              </Button>
            </div>
          )}
    </div>
  );
};

export default TokenPicker;
