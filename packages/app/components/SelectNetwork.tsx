"use client";

import { Button, Icon } from "@/ui";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { ChainIcon } from "connectkit";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

export const SelectNetwork = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { chain, chains } = useNetwork();
  const { isConnected } = useAccount();

  if (!isConnected || !chain) return <></>;

  const onValueChange = (networkId: string) => {
    switchNetwork && switchNetwork(Number(networkId));
  };

  return (
    <Listbox value={chain.id.toString()} onChange={onValueChange}>
      <div className="relative">
        <Listbox.Button
          as={Button}
          iconRight="caret-down"
          size="sm"
          action="tertiary"
          className="border-none shadow-sm rounded-xl flex flex-row focus:bg-white focus:ring-0 active:ring-0 h-10"
        >
          <ChainIcon size={20} id={chain.id} unsupported={chain.unsupported} />
          <span className="hidden md:inline-block">
            {chain.unsupported ? "Unsupported Network" : chain.name}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-auto overflow-auto rounded-2xl bg-white py-1 text-base shadow-md  focus:outline-none sm:text-sm">
            {chains.map(({ id, name }) => (
              <Listbox.Option
                key={id}
                className="relative cursor-pointer select-none py-2 pr-10 pl-4 hover:bg-surface-75"
                value={id.toString()}
              >
                {({ selected }) => {
                  return (
                    <>
                      <span className="flex items-center space-x-2">
                        <ChainIcon size={20} id={id} />
                        <span>{name}</span>
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-amber-600">
                          <Icon
                            name="check"
                            className="h-4 w-4 text-primary-600"
                          />
                        </span>
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
