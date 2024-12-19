"use client";

import { Fragment } from "react";
import { ChainIcon } from "connectkit";
import { Listbox, Transition } from "@headlessui/react";

import { Button, Icon } from "@/ui";
import { useNetworkContext } from "@/contexts";
import Image from "next/image";
import { ChainId } from "@stackly/sdk";

const CustomChainIcon = ({ id, size }: { id: number; size: number }) => {
  if (id === ChainId.BASE) {
    return (
      <Image
        src="/assets/images/base-logo.svg"
        alt="Base network logo"
        width={size}
        height={size}
        className="rounded-full"
      />
    );
  }

  // Fall back to ConnectKit's ChainIcon for other networks
  return <ChainIcon size={size} id={id} />;
};

export const SelectNetwork = () => {
  const { chains, changeNetwork, chainId, selectedChain } = useNetworkContext();
  return (
    <Listbox
      value={chainId.toString()}
      onChange={(chainId) => {
        changeNetwork(parseInt(chainId));
      }}
    >
      <div className="relative">
        <Listbox.Button
          as={Button}
          iconRight="caret-down"
          size="sm"
          variant="tertiary"
          className="flex h-10 rounded-xl border-none shadow-sm focus:bg-white focus:ring-0 active:ring-0"
        >
          <div className="flex items-center space-x-2">
            <CustomChainIcon size={20} id={chainId} />
            <span className="hidden md:inline-block">
              {selectedChain?.name}
            </span>
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="overflow-auto absolute z-10 py-1 mt-1 w-auto max-h-60 text-base bg-white rounded-2xl shadow-md focus:outline-none sm:text-sm">
            {chains?.map(({ id, name }) => (
              <Listbox.Option
                key={id}
                className="relative py-2 pr-10 pl-4 cursor-pointer select-none hover:bg-surface-75"
                value={id.toString()}
              >
                {({ selected }) => {
                  return (
                    <>
                      <div className="flex items-center space-x-2">
                        <CustomChainIcon size={20} id={id} />
                        <p className="text-nowrap">{name}</p>
                      </div>
                      {selected ? (
                        <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-amber-600">
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
