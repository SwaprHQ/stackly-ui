"use client";

import { Fragment, useEffect, useState } from "react";

import type { Chain } from "viem/chains";
import { ChainIcon } from "connectkit";
import { Listbox, Transition } from "@headlessui/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { Button, Icon } from "@/ui";
import { config } from "@/providers";
import { useStackboxFormContext } from "@/contexts";

interface WagmiChain extends Chain {
  unsupported?: boolean;
}

export const SelectNetwork = () => {
  const { stackboxFormState } = useStackboxFormContext();
  const [, setChainId] = stackboxFormState.chainIdState;
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      setChainId(data.id);
    },
  });
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const [selectedChain, setSelectedChain] = useState<WagmiChain>();
  const [allowedChains, setAllowedChains] = useState<WagmiChain[] | undefined>(
    []
  );

  const handleDisconnectedNetworkSwitch = (newChainId: number) => {
    config.setState((oldState: any) => {
      const { publicClient } = oldState;
      const { chains } = publicClient;

      const newChain = chains?.find(
        (allowedChain: any) => allowedChain.id === newChainId
      );

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

  const onValueChange = (networkId: string) => {
    if (isConnected) {
      switchNetwork && switchNetwork(Number(networkId));
    } else {
      handleDisconnectedNetworkSwitch(parseInt(networkId));
    }
  };

  useEffect(() => {
    if (chain) setChainId(chain.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain]);

  useEffect(() => {
    const { chains } = config.getPublicClient();

    if (chains) {
      setAllowedChains(chains);
      setSelectedChain(chains[0]);
    }
  }, []);

  useEffect(() => {
    if (isConnected && chain) setSelectedChain(chain);
  }, [chain, isConnected]);

  return (
    <Listbox value={selectedChain?.id.toString()} onChange={onValueChange}>
      <div className="relative">
        <Listbox.Button
          as={Button}
          iconRight="caret-down"
          size="sm"
          variant="tertiary"
          className="flex h-10 border-none shadow-sm rounded-xl focus:bg-white focus:ring-0 active:ring-0"
        >
          <div className="flex items-center space-x-2">
            <ChainIcon
              size={20}
              id={selectedChain?.id}
              unsupported={selectedChain?.unsupported}
            />
            <span className="hidden md:inline-block">
              {selectedChain?.unsupported
                ? "Unsupported Network"
                : selectedChain?.name}
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-auto py-1 mt-1 overflow-auto text-base bg-white shadow-md max-h-60 rounded-2xl focus:outline-none sm:text-sm">
            {allowedChains?.map(({ id, name }) => (
              <Listbox.Option
                key={id}
                className="relative py-2 pl-4 pr-10 cursor-pointer select-none hover:bg-surface-75"
                value={id.toString()}
              >
                {({ selected }) => {
                  return (
                    <>
                      <div className="flex items-center space-x-2">
                        <ChainIcon size={20} id={id} />
                        <p>{name}</p>
                      </div>
                      {selected ? (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600">
                          <Icon
                            name="check"
                            className="w-4 h-4 text-primary-600"
                          />
                        </div>
                      ) : null}
                    </>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
