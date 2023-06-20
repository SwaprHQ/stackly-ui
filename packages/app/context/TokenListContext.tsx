"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNetwork } from "wagmi";
import defaultGnosisTokenlist from "public/assets/blockchains/gnosis/tokenlist.json";
import defaultEthereumTokenlist from "public/assets/blockchains/ethereum/tokenlist.json";

import { TokenFromTokenlist } from "@/models/token/types";

const GNOSIS_CHAIN_ID = 100;

const DEFAULT_TOKEN_LIST_BY_CHAIN: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  1: defaultEthereumTokenlist,
  100: defaultGnosisTokenlist,
};

const TOKEN_LIST_BY_CHAIN_URL: { [chainId: number]: string } = {
  1: "https://tokens.1inch.eth.link/",
  100: "https://tokens.honeyswap.org/",
};

const TokenListContext = createContext<{
  tokenList: TokenFromTokenlist[];
  setTokenList: Dispatch<SetStateAction<TokenFromTokenlist[]>>;
}>({
  tokenList: DEFAULT_TOKEN_LIST_BY_CHAIN[GNOSIS_CHAIN_ID],
  setTokenList: () => {},
});

const mergeTokenlists = (
  defaultTokenList: TokenFromTokenlist[],
  tokenlist: TokenFromTokenlist[]
) =>
  defaultTokenList.concat(
    tokenlist.filter(
      (token) =>
        !defaultTokenList.some(
          (defaultToken) => defaultToken.address === token.address
        )
    )
  );

export const TokenListProvider = ({ children }: PropsWithChildren) => {
  const { chain } = useNetwork();

  const defaultTokenList = chain
    ? DEFAULT_TOKEN_LIST_BY_CHAIN[chain.id]
    : DEFAULT_TOKEN_LIST_BY_CHAIN[GNOSIS_CHAIN_ID];

  const [tokenList, setTokenList] = useState<TokenFromTokenlist[]>(
    defaultGnosisTokenlist
  );

  const setupTokenList = useCallback(async () => {
    async function gettokenListData() {
      const res = await fetch(
        chain
          ? TOKEN_LIST_BY_CHAIN_URL[chain.id]
          : TOKEN_LIST_BY_CHAIN_URL[GNOSIS_CHAIN_ID]
      );
      // todo: should we throw an error here or a warning? since it should work without it.
      if (!res.ok) {
        throw new Error("Failed to fetch tokenlist data");
      }
      return res.json();
    }
    const data = await gettokenListData();

    const mergedTokenlistTokens = mergeTokenlists(
      defaultTokenList,
      data.tokens
    );
    setTokenList(mergedTokenlistTokens);
  }, [defaultTokenList, chain]);

  useEffect(() => {
    setupTokenList();
  }, [setupTokenList]);

  return (
    <TokenListContext.Provider value={{ tokenList, setTokenList }}>
      {children}
    </TokenListContext.Provider>
  );
};

export const useTokenListContext = () => useContext(TokenListContext);
