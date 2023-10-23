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
import { useAccount, useNetwork } from "wagmi";
import { formatUnits, hexToBigInt } from "viem";

import { ChainId, MULTICALL_ADDRESS } from "@stackly/sdk";
import { Erc20Abi, MulticallAbi } from "@stackly/sdk/abis";
import defaultGnosisTokenlist from "public/assets/blockchains/gnosis/tokenlist.json";
import defaultEthereumTokenlist from "public/assets/blockchains/ethereum/tokenlist.json";
import { TokenFromTokenlist } from "@/models/token/types";
import { ethers } from "ethers";
import { RPC_LIST } from "@/constants";

export interface TokenWithBalance extends TokenFromTokenlist {
  balance?: string;
}

const DEFAULT_TOKEN_LIST_BY_CHAIN: {
  [chainId: number]: TokenFromTokenlist[];
} = {
  [ChainId.ETHEREUM]: defaultEthereumTokenlist,
  [ChainId.GNOSIS]: defaultGnosisTokenlist,
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
                hexToBigInt(balances[index]),
                token.decimals
              ),
            }))
            .sort(
              (tokenA, tokenB) =>
                Number(tokenB.balance) - Number(tokenA.balance)
            );

          setTokenListWithBalances(listWithBalances);
        });
    }
  }, [address, callArray, chainId, tokenList]);

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
  }, [address, chainId, setupTokenList]);

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
