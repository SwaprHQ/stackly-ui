"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Chain } from "viem/chains";
import { ChainId } from "@stackly/sdk";
import { gnosis } from "wagmi/chains";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { config } from "@/providers/wagmi-config";
import { useQueryState } from "next-usequerystate";
import { checkIsValidChainId } from "@/utils";

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

  const [, setFromTokenSearchParams] = useQueryState("fromToken");
  const [, setToTokenSearchParams] = useQueryState("toToken");
  const [searchParamsChainId, setSearchParamsChainId] =
    useQueryState("chainId");

  const [selectedChain, setSelectedChain] = useState<WagmiChain>(gnosis);
  const [selectedChainId, setSelectedChainId] = useState<ChainId>(gnosis.id);

  const resetTokensOnSearchParams = useCallback(() => {
    setFromTokenSearchParams(null);
    setToTokenSearchParams(null);
  }, [setFromTokenSearchParams, setToTokenSearchParams]);

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
      setSearchParamsChainId(data?.id.toString());
    },
  });

  useEffect(() => {
    const parsedSearchParamsChainId = searchParamsChainId
      ? parseInt(searchParamsChainId)
      : 0;
    const newChainIsDiferentFromCurrent =
      parsedSearchParamsChainId !== chain?.id;

    const isValidSearchParamsChainId = checkIsValidChainId(
      parsedSearchParamsChainId
    );

    if (isValidSearchParamsChainId) {
      if (isConnected && switchNetwork && newChainIsDiferentFromCurrent) {
        switchNetwork(parsedSearchParamsChainId);
        return;
      }

      if (chains) {
        const chainFromSearchParams = chains.find(
          (chain) => chain.id === parsedSearchParamsChainId
        );

        if (chainFromSearchParams) {
          setSelectedChain(chainFromSearchParams);
          setSelectedChainId(chainFromSearchParams.id);
          return;
        }
      }
    }
    // set default chain
    setSelectedChain(gnosis);
    setSelectedChainId(gnosis.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chains, searchParamsChainId, switchNetwork]);

  useEffect(() => {
    if (isConnected && chain) {
      setSelectedChain(chain);
      setSelectedChainId(chain?.id);
    }
  }, [chain, isConnected]);
  const changeNetwork = (networkId: ChainId) => {
    resetTokensOnSearchParams();
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
