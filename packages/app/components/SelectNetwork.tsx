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

  const onValueChange = (networkId: string) =>
    switchNetwork && switchNetwork(Number(networkId));

  return (
    <Listbox value={chain.id.toString()} onChange={onValueChange}>
      <div className="relative z-10">
        <Listbox.Button
          as={Button}
          iconRight="caret-down"
          size="sm"
          action="tertiary"
          className="flex flex-row h-10 border-none shadow-sm rounded-xl focus:bg-white focus:ring-0 active:ring-0"
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
          <Listbox.Options className="absolute w-auto py-1 mt-1 overflow-auto text-base bg-white shadow-md max-h-60 rounded-2xl focus:outline-none sm:text-sm">
            {chains.map(({ id, name }) => (
              <Listbox.Option
                key={id}
                className="relative py-2 pl-4 pr-10 cursor-pointer select-none hover:bg-surface-75"
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
                            className="w-4 h-4 text-primary-600"
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
