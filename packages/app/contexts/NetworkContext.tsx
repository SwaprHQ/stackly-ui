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
import { parseAsInteger, useQueryState } from "next-usequerystate";
import { getIsValidChainId } from "@/utils";

interface WagmiChain extends Chain {
  unsupported?: boolean;
}

const throwNetworkContextError = () => {
  throw new Error("No NetworkContext available");
};

interface NetworkContextProps {
  chains?: WagmiChain[];
  chainId: ChainId;
  changeNetwork: (newChainId: string) => void;
  selectedChain: WagmiChain;
  setChainId: React.Dispatch<React.SetStateAction<ChainId | null>>;
}

const NetworkContext = createContext<NetworkContextProps>({
  chainId: ChainId.GNOSIS,
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

  const [chainId, setChainId] = useQueryState(
    "chainId",
    parseAsInteger.withDefault(ChainId.GNOSIS)
  );
  const [selectedChain, setSelectedChain] = useState<WagmiChain>(gnosis);
  const [chains, setChains] = useState<WagmiChain[] | undefined>([]);

  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      setChainId(data.id);
    },
  });

  useEffect(() => {
    const { chains: wagmiChains } = config.getPublicClient();

    if (chains) setChains(wagmiChains);
    if (!chainId) {
      setChainId(ChainId.GNOSIS);
      setSelectedChain(gnosis);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { chains: wagmiChains } = config.getPublicClient();
    const chainFromParams = wagmiChains?.find((chain) => chain.id === chainId);

    if (isConnected && chain?.id !== chainFromParams?.id && switchNetwork)
      switchNetwork?.(chainId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchNetwork]);

  useEffect(() => {
    const { chains } = config.getPublicClient();
    const isValidChainId = getIsValidChainId(chainId);

    if (!isValidChainId) setChainId(ChainId.GNOSIS);
    if (chains) {
      const validChainId = isValidChainId ? chainId : ChainId.GNOSIS;
      const validChain = chains.find((chain) => chain.id === validChainId);

      setSelectedChain(validChain as WagmiChain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, selectedChain]);

  useEffect(() => {
    if (isConnected && chain) setSelectedChain(chain);
  }, [chain, isConnected]);

  const networkContext = useMemo(() => {
    const handleDisconnectedNetworkSwitch = (newChainId: number) => {
      config.setState((oldState: any) => {
        const { publicClient } = oldState;
        const { chains } = publicClient;

        const newChain = chains?.find((chain: any) => chain.id === newChainId);

        setChainId(newChain.id);
        setSelectedChain(newChain);

        return {
          ...oldState,
          publicClient: {
            ...publicClient,
            chain: newChain,
          },
        };
      });
    };

    const changeNetwork = (networkId: string) => {
      if (isConnected) {
        switchNetwork && switchNetwork(Number(networkId));
      } else {
        handleDisconnectedNetworkSwitch(parseInt(networkId));
      }
    };

    return {
      chains,
      chainId,
      changeNetwork,
      selectedChain,
      setChainId,
    };
  }, [chains, chainId, isConnected, selectedChain, setChainId, switchNetwork]);

  return (
    <NetworkContext.Provider value={networkContext}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetworkContext = () => useContext(NetworkContext);
