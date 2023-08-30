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
import { ethers } from "ethers";
import { formatUnits, hexToBigInt } from "viem";
import { useAccount, useNetwork } from "wagmi";

import defaultGnosisTokenlist from "public/assets/blockchains/gnosis/tokenlist.json";
import defaultEthereumTokenlist from "public/assets/blockchains/ethereum/tokenlist.json";
import { TokenFromTokenlist } from "@/models/token/types";
import { Erc20Abi, MulticallAbi } from "../../sdk/abis";
import { MULTICALL_ADDRESS } from "@stackly/sdk";

export interface TokenWithBalance extends TokenFromTokenlist {
  balance?: string;
}

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

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.gnosischain.com"
);
const multicallInterface = new ethers.utils.Interface(MulticallAbi);
const erc20Interface = new ethers.utils.Interface(Erc20Abi);

const TokenListContext = createContext<{
  tokenList: TokenFromTokenlist[];
  tokenListWithBalances?: TokenWithBalance[];
  getTokenLogoURL?: (tokenAddress: string) => string;
  getTokenFromList?: (tokenAddress: string) => TokenFromTokenlist | undefined;
}>({
  tokenList: DEFAULT_TOKEN_LIST_BY_CHAIN[GNOSIS_CHAIN_ID],
});

const mergeTokenlists = (
  defaultTokenList: TokenFromTokenlist[],
  tokenlist: TokenFromTokenlist[]
) => {
  const addresses = new Set(
    defaultTokenList.map((token) => token.address.toLowerCase())
  );
  const mergedLists = [
    ...defaultTokenList,
    ...tokenlist.filter((token) => !addresses.has(token.address.toLowerCase())),
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

  const defaultTokenList = chain
    ? DEFAULT_TOKEN_LIST_BY_CHAIN[chain.id]
    : DEFAULT_TOKEN_LIST_BY_CHAIN[GNOSIS_CHAIN_ID];

  const fetchTokenlistURL = chain
    ? TOKEN_LIST_BY_CHAIN_URL[chain.id]
    : TOKEN_LIST_BY_CHAIN_URL[GNOSIS_CHAIN_ID];

  const callArray = useMemo(() => {
    if (address && tokenList) {
      return tokenList.map((token) => [
        token.address,
        erc20Interface.encodeFunctionData("balanceOf", [address]),
      ]);
    }
  }, [address, tokenList]);

  const setupTokenList = useCallback(async () => {
    async function getTokenListData() {
      try {
        const res = await fetch(fetchTokenlistURL);
        if (!res.ok) {
          throw new Error("Failed to fetch tokenlist data");
        }
        return res.json();
      } catch (error) {
        console.error("Error fetching tokenlist data:", error);
      }
    }
    const data = await getTokenListData();

    const mergedTokenlistTokens = data?.tokens
      ? mergeTokenlists(defaultTokenList, data.tokens)
      : defaultTokenList;

    setTokenList(
      mergedTokenlistTokens.filter(
        (token: TokenFromTokenlist) => token.chainId === chain?.id
      )
    );
  }, [chain?.id, defaultTokenList, fetchTokenlistURL]);

  useEffect(() => {
    setupTokenList();
  }, [address, setupTokenList]);

  /**
   * Once the tokenList is defined and we have an address
   * connected, we read data from the blockchain using
   * the Provider through the Multicall SC to batch fetch
   * all the ERC-20 token balances for the connected wallet
   * and the supported token list, then we desc. sort them
   */
  useEffect(() => {
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
          const resultados = callResult.returnData;

          const listWithBalances = tokenList
            .map((token, index) => ({
              ...token,
              balance: formatUnits(
                hexToBigInt(resultados[index]),
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
  }, [address, callArray, tokenList]);

  const tokenListContext = useMemo(
    () => ({
      tokenList,
      tokenListWithBalances,
      getTokenFromList: (tokenAddress: string) =>
        tokenList.find(
          (token) => token.address.toUpperCase() === tokenAddress?.toUpperCase()
        ),
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
