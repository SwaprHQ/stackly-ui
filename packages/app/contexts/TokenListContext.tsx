"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { erc20ABI, useAccount, useNetwork } from "wagmi";
import { formatUnits } from "viem";
import { multicall } from "@wagmi/core";

import { ChainId } from "@stackly/sdk";
import defaultGnosisTokenlist from "public/assets/blockchains/gnosis/tokenlist.json";
import defaultEthereumTokenlist from "public/assets/blockchains/ethereum/tokenlist.json";
import { TokenFromTokenlist } from "@/models/token/types";

export interface TokenWithBalance extends TokenFromTokenlist {
  balance?: string;
}

const DEFAULT_TOKEN_LIST_BY_CHAIN: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  1: defaultEthereumTokenlist,
  100: defaultGnosisTokenlist,
};

const TOKEN_LISTS_BY_CHAIN_URL: { [chainId: number]: string[] } = {
  1: [
    "https://tokens.1inch.eth.link/",
    "https://files.cow.fi/tokens/CoinGecko.json",
    "https://files.cow.fi/tokens/CowSwap.json",
  ],
  100: [
    "https://tokens.honeyswap.org/",
    "https://files.cow.fi/tokens/CowSwap.json",
  ],
};

const TokenListContext = createContext<{
  tokenList: TokenFromTokenlist[];
  tokenListWithBalances?: TokenWithBalance[];
  getTokenLogoURL: (tokenAddress: string) => string;
  getTokenFromList: (tokenAddress: string) => TokenFromTokenlist | false;
}>({
  tokenList: DEFAULT_TOKEN_LIST_BY_CHAIN[ChainId.GNOSIS],
  getTokenLogoURL: (tokenAddress: string) => "#",
  getTokenFromList: (tokenAddress: string) => false,
});

const mergeTokenlists = (
  tokenList: TokenFromTokenlist[],
  newTokenlist: TokenFromTokenlist[]
) => {
  const addresses = new Set(
    tokenList.map((token) => token.address.toLowerCase())
  );
  const mergedLists = [
    ...tokenList,
    ...newTokenlist.filter(
      (token) => !addresses.has(token.address.toLowerCase())
    ),
  ];

  return mergedLists;
};

export const TokenListProvider = ({ children }: PropsWithChildren) => {
  const [tokenList, setTokenList] = useState<TokenFromTokenlist[]>(
    defaultGnosisTokenlist
  );
  const [tokenListWithBalances, setTokenListWithBalances] =
    useState<TokenWithBalance[]>();
  const { chain } = useNetwork();
  const { address } = useAccount();

  const chainId = chain?.id ?? ChainId.GNOSIS;

  const defaultTokenList = chain
    ? DEFAULT_TOKEN_LIST_BY_CHAIN[chain.id]
    : DEFAULT_TOKEN_LIST_BY_CHAIN[ChainId.GNOSIS];

  const fetchTokenlistURLS = chain
    ? TOKEN_LISTS_BY_CHAIN_URL[chain.id]
    : TOKEN_LISTS_BY_CHAIN_URL[ChainId.GNOSIS];

  const setupTokenList = useCallback(async () => {
    let mergedTokenlistTokens = defaultTokenList;

    async function getTokenListData(tokenlistURL: string) {
      const res = await fetch(tokenlistURL);
      if (!res.ok) {
        throw new Error("Failed to fetch tokenlist data");
      }
      return res.json();
    }

    Promise.allSettled(
      fetchTokenlistURLS.map((list) => getTokenListData(list))
    ).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          mergedTokenlistTokens = mergeTokenlists(
            mergedTokenlistTokens,
            result.value.tokens
          );
        } else {
          console.error("Error fetching tokenlist data:", result.reason);
        }
      });

      setTokenList(
        mergedTokenlistTokens.filter(
          (token: TokenFromTokenlist) => token.chainId === chainId
        )
      );
    });
  }, [chainId, defaultTokenList, fetchTokenlistURLS]);

  useEffect(() => {
    setupTokenList();
  }, [address, setupTokenList]);

  /**
   * Once the tokenList is defined and we have an address
   * connected, we batch fetch all the ERC-20 token balances
   * for the connected wallet and the supported token list,
   * then we desc. sort them
   */
  useEffect(() => {
    if (address) {
      const fetchErc20Balances = async () => {
        try {
          const batchFetchdata = await multicall({
            contracts: tokenList.map((token) => ({
              address: token.address as `0x${string}`,
              abi: erc20ABI,
              functionName: "balanceOf",
              args: [address as `0x${string}`],
              chainId: token.chainId,
            })),
            allowFailure: true,
          });

          const listWithBalances = tokenList
            .map((token, index) => ({
              ...token,
              balance: formatUnits(
                batchFetchdata[index]?.result as bigint,
                token.decimals
              ),
            }))
            .sort(
              (tokenA, tokenB) =>
                Number(tokenB.balance) - Number(tokenA.balance)
            );

          setTokenListWithBalances(listWithBalances);
        } catch (error) {
          console.error("Error fetching tokenlist balances:", error);
        }
      };

      fetchErc20Balances();
    } else {
      setTokenListWithBalances([]);
    }
  }, [address, chain?.id, tokenList]);

  const tokenListContext = useMemo(
    () => ({
      tokenList,
      tokenListWithBalances,
      getTokenFromList: (tokenAddress: string) =>
        tokenList.find(
          (token) => token.address.toUpperCase() === tokenAddress?.toUpperCase()
        ) ?? false,
      getTokenLogoURL: (tokenAddress: string) =>
        tokenList.find(
          (token) => token.address.toUpperCase() === tokenAddress?.toUpperCase()
        )?.logoURI ?? "#",
    }),
    [tokenList, tokenListWithBalances]
  );

  return (
    <TokenListContext.Provider value={tokenListContext}>
      {children}
    </TokenListContext.Provider>
  );
};

export const useTokenListContext = () => useContext(TokenListContext);
