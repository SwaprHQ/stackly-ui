"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Chain } from "viem/chains";
import { ChainId } from "@stackly/sdk";
import { gnosis } from "wagmi/chains";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { config } from "@/providers/wagmi-config";
import { useQueryState } from "next-usequerystate";
import { checkIsValidChainId } from "@/utils";
import { useChains, ChainIcon } from "connectkit";

interface WagmiChain extends Chain {
  unsupported?: boolean;
}

const throwNetworkContextError = () => {
  throw new Error("No NetworkContext available");
};

interface NetworkContextProps {
  chains?: WagmiChain[];
  chainId: ChainId;
  changeNetwork: (newChainId: ChainId) => void;
  selectedChain: WagmiChain;
  setChainId: React.Dispatch<React.SetStateAction<ChainId>>;
}

const NetworkContext = createContext<NetworkContextProps>({
  chainId: gnosis.id,
  changeNetwork: throwNetworkContextError,
  selectedChain: gnosis,
  setChainId: throwNetworkContextError,
});

interface NetworkContextProviderProps {
  children: ReactNode;
}

export const NetworkContextProvider = ({
  children,
}: NetworkContextProviderProps) => {
  const { chains } = config.getPublicClient();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const [searchParamsChainId, setSearchParamsChainId] =
    useQueryState("chainId");
  const [toTokenSearchParams, setToTokenSearchParams] =
    useQueryState("toToken");
  const [fromTokenSearchParams, setFromTokenSearchParams] =
    useQueryState("fromToken");

  const [selectedChain, setSelectedChain] = useState<WagmiChain>(gnosis);
  const [selectedChainId, setSelectedChainId] = useState<ChainId>(gnosis.id);

  const resetTokensSearchParams = useCallback(() => {
    if (fromTokenSearchParams) setFromTokenSearchParams(null);
    if (toTokenSearchParams) setToTokenSearchParams(null);
  }, [
    fromTokenSearchParams,
    setFromTokenSearchParams,
    setToTokenSearchParams,
    toTokenSearchParams,
  ]);

  const switchNetworkNotConnected = (newChainId: ChainId) => {
    config.setState((oldState: any) => {
      const { publicClient } = oldState;
      const { chains } = publicClient;

      const newChain = chains?.find((chain: any) => chain.id === newChainId);

      setSelectedChain(newChain);
      setSelectedChainId(newChain.id);
      setSearchParamsChainId(newChain.id);

      return {
        ...oldState,
        publicClient: {
          ...publicClient,
          chain: newChain,
        },
      };
    });
  };

  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      resetTokensSearchParams();
      setSearchParamsChainId(data?.id.toString());
    },
  });

  useEffect(() => {
    if (isConnected && chains) {
      if (searchParamsChainId && switchNetwork) {
        const isValidSearchParamsChainId = checkIsValidChainId(
          parseInt(searchParamsChainId)
        );

        if (
          isValidSearchParamsChainId &&
          parseInt(searchParamsChainId) !== chain?.id
        )
          switchNetwork(parseInt(searchParamsChainId));
      }
    } else {
      if (searchParamsChainId) {
        const chainFromSearchParams = chains?.find(
          (chain: any) => chain.id === parseInt(searchParamsChainId)
        );

        if (chainFromSearchParams) {
          switchNetworkNotConnected(chainFromSearchParams.id);
        }
      } else {
        // set default chain
        setSelectedChain(gnosis);
        setSelectedChainId(gnosis.id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chains, searchParamsChainId, switchNetwork]);

  useEffect(() => {
    if (isConnected && chain) {
      setSelectedChain(chain);
      setSelectedChainId(chain?.id);
    }
  }, [chain, isConnected]);
  const changeNetwork = (networkId: ChainId) => {
    isConnected
      ? switchNetwork && switchNetwork(networkId)
      : switchNetworkNotConnected(networkId);
  };
  const networkContext = {
    chains,
    chainId: selectedChainId,
    changeNetwork,
    selectedChain,
    setChainId: setSelectedChainId,
  };

  return (
    <NetworkContext.Provider value={networkContext}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
