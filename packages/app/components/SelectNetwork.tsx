"use client";

import { Button, Icon } from "@/ui";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { ChainIcon } from "connectkit";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { parseAsInteger, useQueryState } from "next-usequerystate";

export const SelectNetwork = () => {
  const [, setChainId] = useQueryState("chainId", parseAsInteger);
  const { switchNetwork } = useSwitchNetwork({
    onSuccess(data) {
      setChainId(data.id);
    },
  });
  const { chain, chains } = useNetwork();
  const { isConnected } = useAccount();

  if (!isConnected || !chain) return <></>;

  const onValueChange = (networkId: string) =>
    switchNetwork && switchNetwork(Number(networkId));

  return (
    <Listbox value={chain.id.toString()} onChange={onValueChange}>
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
              id={chain.id}
              unsupported={chain.unsupported}
            />
            <span className="hidden md:inline-block">
              {chain.unsupported ? "Unsupported Network" : chain.name}
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
            {chains.map(({ id, name }) => (
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
