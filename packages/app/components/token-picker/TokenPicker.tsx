"use client";

import { ChangeEvent, RefObject, forwardRef, useEffect, useState } from "react";

import { useAccount } from "wagmi";

import {
  BodyText,
  Button,
  ChipButton,
  Dialog,
  DialogContent,
  DialogFooterActions,
  Icon,
  Modal,
  ModalBaseProps,
  ModalContent,
  ModalHeaderTitle,
} from "@/ui";
import { EmptyStateTokenPickerImg } from "@/public/assets";
import { EmptyState, TokenIcon } from "@/components";
import {
  TokenWithBalance,
  useNetworkContext,
  useTokenListContext,
} from "@/contexts";
import { formatTokenValue } from "@/utils/token";
import { TokenFromTokenlist } from "@/models/token";

import { TOKEN_PICKER_COMMON_TOKENS } from "./constants";
import { isAddress } from "viem";
import { getERC20Contract } from "@stackly/sdk";
import { getExplorerLink, useEthersSigner } from "../../utils";

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
  const { tokenList, tokenListWithBalances } = useTokenListContext();
  const { chainId } = useNetworkContext();
  const signer = useEthersSigner({ chainId });

  const { isConnected } = useAccount();

  const [tokenSearchQuery, setTokenSearchQuery] = useState("");
  const [commonTokens, setCommonTokens] = useState<TokenFromTokenlist[]>(
    TOKEN_PICKER_COMMON_TOKENS[chainId]
  );

  const [debouncedQuery, setDebouncedQuery] = useState(tokenSearchQuery);
  const trimmedQuery = debouncedQuery.trim();

  const [isFetchingCustomToken, setIsFetchingCustomToken] =
    useState<boolean>(false);
  const [filteredTokenList, setFilteredTokenList] =
    useState<TokenWithBalance[]>(tokenList);

  const tokenListSearchCleanup = () => {
    setDebouncedQuery("");
    setTokenSearchQuery("");
  };

  const tokenListCleanup = () => {
    setFilteredTokenList(
      isConnected && tokenListWithBalances ? tokenListWithBalances : tokenList
    );
  };

  const handleTokenSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setDebouncedQuery(query);

    if (!query.trim()) {
      tokenListCleanup();
    }
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

  useEffect(() => {
    if (isConnected && tokenListWithBalances) {
      setFilteredTokenList(tokenListWithBalances);
    } else {
      setFilteredTokenList(tokenList);
    }
  }, [isConnected, tokenList, tokenListWithBalances]);

  const onClearSearch = () => {
    tokenListSearchCleanup();
    tokenListCleanup();
  };

  useEffect(() => {
    if (trimmedQuery) {
      const newList =
        isConnected && tokenListWithBalances
          ? tokenListWithBalances
          : tokenList;

      const filteredList = newList.filter(
        (token) =>
          token.symbol.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          token.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          token.address.toLowerCase().includes(trimmedQuery.toLowerCase())
      );

      setFilteredTokenList(filteredList);
    }
  }, [isConnected, tokenList, tokenListWithBalances, trimmedQuery]);

  useEffect(() => {
    (async () => {
      if (isAddress(trimmedQuery) && !filteredTokenList.length) {
        if (!signer) return;
        setIsFetchingCustomToken(true);

        const sellTokenContract = getERC20Contract(trimmedQuery, signer);

        const address = sellTokenContract.address;
        try {
          const decimals = await sellTokenContract.decimals();
          const name = await sellTokenContract.name();
          const symbol = await sellTokenContract.symbol();

          setFilteredTokenList([
            {
              address,
              decimals,
              name,
              symbol,
              chainId,
              logoURI: "",
              isImported: true,
            },
          ]);
        } catch (e) {
          console.error(e);
        } finally {
          setIsFetchingCustomToken(false);
        }
      }
    })();
  }, [chainId, trimmedQuery, filteredTokenList.length, signer]);

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
          onClearSearch={onClearSearch}
          onTokenSelect={handleTokenSelect}
          tokenList={filteredTokenList}
          tokenSearchQuery={tokenSearchQuery}
          isLoading={isFetchingCustomToken}
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
  isLoading?: boolean;
}
const TokenList = ({
  onClearSearch,
  onTokenSelect,
  tokenList = [],
  tokenSearchQuery,
  isLoading,
}: TokenListProps) => {
  const { isConnected } = useAccount();
  const queryIsAddress = tokenSearchQuery && isAddress(tokenSearchQuery);

  return (
    <div className="mt-5 overflow-y-auto border-t divide-y h-72 border-surface-50 divide-surface-50">
      {isLoading ? (
        <EmptyState className="animate-pulse" text="Loading..." />
      ) : tokenList.length ? (
        tokenList.map((token) => (
          <TokenListRow
            onTokenSelect={onTokenSelect}
            key={token.address}
            token={token}
          />
        ))
      ) : (
        tokenSearchQuery && (
          <div className="flex flex-col items-center justify-center mt-8 space-y-4">
            <EmptyStateTokenPickerImg />
            <BodyText className="text-center">{`Nothing found for "${tokenSearchQuery}".`}</BodyText>
            {queryIsAddress && !isConnected && (
              <BodyText className="text-sm text-center text-em-med">
                Connect your wallet to import this token.
              </BodyText>
            )}
            <Button variant="secondary" onClick={onClearSearch} size="md">
              Clear search
            </Button>
          </div>
        )
      )}
    </div>
  );
};

interface TokenListRowProps {
  token: TokenWithBalance;
  onTokenSelect: (token: TokenWithBalance) => void;
}
const TokenListRow = ({ onTokenSelect, token }: TokenListRowProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div
      className="flex items-center justify-between w-full h-16 px-4 cursor-pointer hover:bg-surface-50"
      key={token.address}
      onClick={() =>
        token.isImported ? setIsDialogOpen(true) : onTokenSelect(token)
      }
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
        {token.isImported && (
          <>
            <Button variant="secondary">Import token</Button>
            <DialogImportToken
              isOpen={isDialogOpen}
              closeAction={() => setIsDialogOpen(false)}
              confirmAction={() => {
                setIsDialogOpen(false);
                onTokenSelect(token);
              }}
              token={token}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface DialogImportTokenProps {
  token: TokenWithBalance;
  isOpen: boolean;
  closeAction: () => void;
  confirmAction: () => void;
}

const DialogImportToken = ({
  isOpen,
  closeAction,
  confirmAction,
  token,
}: DialogImportTokenProps) => (
  <Dialog isOpen={isOpen} closeAction={closeAction}>
    <Icon name="warning" className="text-danger-500" size={38} />
    <DialogContent
      title=" Are you sure you want to import this token?"
      description="This token doesn't appear on the token list. Stack orders might malfunction with imported tokens."
    />
    <div className="flex flex-col items-center pt-3 space-y-3">
      <BodyText size={3} className="text-primary-100">
        {token.symbol}
      </BodyText>
      <BodyText className="text-primary-100">{token.name}</BodyText>
      <BodyText size={1}>
        <a
          className="flex items-center text-primary-100 hover:underline hover:underline-offset-4"
          href={getExplorerLink(token.chainId, token.address, "address")}
          target="blank"
        >
          {token.address}{" "}
          <Icon size={16} name="arrow-external" className="ml-1" />
        </a>
      </BodyText>
    </div>
    <DialogFooterActions
      primaryAction={confirmAction}
      primaryText="Import token"
      secondaryAction={closeAction}
      secondaryText="Dismiss"
    />
  </Dialog>
);
