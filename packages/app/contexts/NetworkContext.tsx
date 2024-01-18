"use client";

import {
  ReactNode,
  createContext,
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

interface WagmiChain extends Chain {
  unsupported?: boolean;
}

const throwNetworkContextError = () => {
  throw new Error("No NetworkContext available");
};

interface NetworkContextProps {
  chains?: WagmiChain[];
  chainId: ChainId;
  changeNetwork: (newChainId: number) => void;
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
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const [searchParamsChainId, setSearchParamsChainId] =
    useQueryState("chainId");
  const { chains } = config.getPublicClient();

  const [selectedChain, setSelectedChain] = useState<WagmiChain>(gnosis);
  const [selectedChainId, setSelectedChainId] = useState<ChainId>(gnosis.id);

  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      setSearchParamsChainId(data?.id.toString());
    },
  });

  // sets chainId from search params
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
          setSelectedChain(chainFromSearchParams);
          setSelectedChainId(chainFromSearchParams.id);
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

  const networkContext = useMemo(() => {
    const handleDisconnectedNetworkSwitch = (newChainId: number) => {
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

    const changeNetwork = (networkId: number) => {
      if (isConnected) {
        switchNetwork && switchNetwork(networkId);
      } else {
        handleDisconnectedNetworkSwitch(networkId);
      }
    };

    return {
      chains,
      chainId: selectedChainId,
      changeNetwork,
      selectedChain,
      setChainId: setSelectedChainId,
    };
  }, [
    chains,
    selectedChainId,
    selectedChain,
    setSearchParamsChainId,
    isConnected,
    switchNetwork,
  ]);

  return (
    <NetworkContext.Provider value={networkContext}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
