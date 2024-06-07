"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ChainId, MULTICALL_ADDRESS } from "@stackly/sdk";
import { Erc20Abi, MulticallAbi } from "@stackly/sdk/abis";
import { ethers } from "ethers";
import { formatUnits, hexToBigInt, isAddress } from "viem";
import { useAccount } from "wagmi";

import { RPC_LIST } from "@/constants";
import { TokenFromTokenlist } from "@/models";

import defaultGnosisTokenlist from "public/assets/blockchains/gnosis/tokenlist.json";
import defaultEthereumTokenlist from "public/assets/blockchains/ethereum/tokenlist.json";
import defaultArbitrumTokenList from "public/assets/blockchains/arbitrum/tokenlist.json";

import { useNetworkContext } from "./NetworkContext";

export interface TokenWithBalance extends TokenFromTokenlist {
  balance?: string;
  isImported?: boolean;
}

const DEFAULT_TOKEN_LIST_BY_CHAIN: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  [ChainId.ETHEREUM]: defaultEthereumTokenlist,
  [ChainId.GNOSIS]: defaultGnosisTokenlist,
  [ChainId.ARBITRUM]: defaultArbitrumTokenList,
};

const TOKEN_LISTS_BY_CHAIN_URL: { [chainId: number]: string[] } = {
  [ChainId.ETHEREUM]: [
    "https://tokens.1inch.eth.link/",
    "https://files.cow.fi/tokens/CoinGecko.json",
    "https://files.cow.fi/tokens/CowSwap.json",
  ],
  [ChainId.GNOSIS]: [
    "https://tokens.honeyswap.org/",
    "https://files.cow.fi/tokens/CowSwap.json",
  ],
  [ChainId.ARBITRUM]: [
    "https://raw.githubusercontent.com/cowprotocol/token-lists/main/src/public/ArbitrumOneUniswapTokensList.json",
    "https://tokens.coingecko.com/arbitrum-one/all.json",
  ],
};

const TokenListContext = createContext<{
  isLoading: boolean;
  tokenList: TokenFromTokenlist[];
  tokenListWithBalances?: TokenWithBalance[];
  getTokenLogoURL: (tokenAddress: string) => string;
  getTokenFromList: (tokenAddress: string) => TokenFromTokenlist | null;
}>({
  isLoading: true,
  tokenList: DEFAULT_TOKEN_LIST_BY_CHAIN[ChainId.ARBITRUM],
  getTokenLogoURL: (tokenAddress: string) => "#",
  getTokenFromList: (tokenAddress: string) => null,
});

export const TokenListProvider = ({ children }: PropsWithChildren) => {
  const { address } = useAccount();
  const { chainId } = useNetworkContext();
  const abortControllerRef = useRef(new AbortController());

  const [tokenList, setTokenList] = useState<TokenFromTokenlist[]>(
    DEFAULT_TOKEN_LIST_BY_CHAIN[chainId]
  );
  const [tokenListWithBalances, setTokenListWithBalances] =
    useState<TokenWithBalance[]>();
  const [isLoading, setIsLoading] = useState(true);

  const defaultTokenList = DEFAULT_TOKEN_LIST_BY_CHAIN[chainId];
  const fetchTokenlistUrls = TOKEN_LISTS_BY_CHAIN_URL[chainId];

  const callArray = useMemo(() => {
    const erc20Interface = new ethers.utils.Interface(Erc20Abi);

    if (address && tokenList) {
      return tokenList.map((token) => [
        token.address,
        erc20Interface.encodeFunctionData("balanceOf", [address]),
      ]);
    }
  }, [address, tokenList]);

  /**
   * Once the tokenList is defined and we have an address
   * connected, we read data from the blockchain using
   * the Provider through the Multicall SC to batch fetch
   * all the ERC-20 token balances for the connected wallet
   * and the supported token list, then we desc. sort them
   */
  useEffect(() => {
    const multicallInterface = new ethers.utils.Interface(MulticallAbi);
    const provider = new ethers.providers.JsonRpcProvider(RPC_LIST[chainId]);

    if (address) {
      provider
        .call({
          to: MULTICALL_ADDRESS,
          data: multicallInterface.encodeFunctionData("aggregate", [callArray]),
        })
        .then((response: any) => {
          const callResult = multicallInterface.decodeFunctionResult(
            "aggregate",
            response
          );
          const balances = callResult.returnData;

          const listWithBalances = tokenList
            .map((token, index) => ({
              ...token,
              balance: formatUnits(
                hexToBigInt(balances[index] !== "0x" ? balances[index] : 0),
                token.decimals
              ),
            }))
            .sort(
              (tokenA, tokenB) =>
                Number(tokenB.balance) - Number(tokenA.balance)
            );

          setTokenListWithBalances(listWithBalances);
        })
        .catch((error) => console.error(error));
    }
  }, [address, callArray, chainId, tokenList]);

  const setupTokenList = useCallback(async () => {
    setIsLoading(true);
    async function getTokenListData(tokenlistURL: string) {
      const { signal } = abortControllerRef.current;
      const res = await fetch(tokenlistURL, { signal });
      if (!res.ok) {
        throw new Error("Failed to fetch tokenlist data");
      }
      return res.json();
    }

    await Promise.allSettled(
      fetchTokenlistUrls.map((list) => getTokenListData(list))
    ).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const mergedTokenlist = [...defaultTokenList, ...result.value.tokens];

          const tokenUniqueAddressesSet = new Set<string>();
          const tokenListNoDuplicates = mergedTokenlist.filter((token) => {
            if (
              isAddress(token.address) &&
              token.chainId === chainId &&
              !tokenUniqueAddressesSet.has(token.address.toLowerCase())
            ) {
              tokenUniqueAddressesSet.add(token.address.toLowerCase());
              return true;
            }
            return false;
          });

          setTokenList(tokenListNoDuplicates);
          setIsLoading(false);
        } else {
          console.error("Error fetching tokenlist data:", result.reason);
        }
      });
    });
  }, [chainId, defaultTokenList, fetchTokenlistUrls]);

  useEffect(() => {
    // abort if still fetching other chain async
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
    setupTokenList();

    return () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
    };
  }, [setupTokenList]);

  const tokenListContext = useMemo(
    () => ({
      isLoading,
      tokenList,
      tokenListWithBalances,
      getTokenFromList: (tokenAddress: string) =>
        tokenList.find(
          (token) => token.address.toUpperCase() === tokenAddress?.toUpperCase()
        ) ?? null,
      getTokenLogoURL: (tokenAddress: string) =>
        tokenList.find(
          (token) => token.address.toUpperCase() === tokenAddress?.toUpperCase()
        )?.logoURI ?? "#",
    }),
    [isLoading, tokenList, tokenListWithBalances]
  );

  return (
    <TokenListContext.Provider value={tokenListContext}>
      {children}
    </TokenListContext.Provider>
  );
};

export const useTokenListContext = () => useContext(TokenListContext);
