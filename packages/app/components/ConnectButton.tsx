"use client";

import { ChainId, WETH, WXDAI } from "@stackly/sdk";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useAccount, useBalance, useEnsAvatar, useNetwork } from "wagmi";

import { BodyText, Button, SizeProps } from "@/ui";
import { useAutoConnect } from "@/hooks";

const CustomConnectButton = ({
  address,
  ensName,
  onClick,
  size,
}: {
  address: `0x${string}`;
  onClick: () => void;
  ensName?: string;
  size: SizeProps;
}) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { data: avatar } = useEnsAvatar({
    name: ensName,
    chainId: ChainId.ETHEREUM,
  });

  const TOKEN_BY_CHAIN: { [chainId: number]: string } = {
    [ChainId.ETHEREUM]: WETH[ChainId.ETHEREUM].address,
    [ChainId.GNOSIS]: WXDAI.address,
  };

  const { data: balance } = useBalance({
    address: address,
    token:
      chain && isConnected
        ? (TOKEN_BY_CHAIN[chain.id] as `0x${string}`)
        : (TOKEN_BY_CHAIN[ChainId.GNOSIS] as `0x${string}`),
  });

  const truncatedAddress = (size: number) =>
    `${address.slice(0, size)}...${address.slice(
      address.length - size,
      address.length
    )}`;

  const formattedBalance = (balanceData: NonNullable<typeof balance>) =>
    balanceData.formatted === "0"
      ? `0 ${balanceData.symbol}`
      : `${balanceData.formatted.substring(
          0,
          balanceData.formatted.length - balanceData.decimals + 3
        )} ${balanceData.symbol}`;

  return (
    <div className="flex bg-gray-alpha-50 rounded-xl p-0.5 justify-center items-center md:space-x-3">
      {balance && (
        <BodyText
          size={2}
          className="hidden ml-3 text-em-med md:block min-w-max"
        >
          {formattedBalance(balance)}
        </BodyText>
      )}
      <Button
        size={size}
        variant="tertiary"
        iconRight="caret-down"
        onClick={onClick}
        width="full"
        className="flex border-none shadow-sm rounded-xl hover:bg-surface-25 focus:bg-white focus:ring-0 active:ring-0"
      >
        {avatar && (
          <Image
            width={20}
            height={20}
            src={avatar}
            alt={address}
            className="rounded-full"
          />
        )}
        <BodyText size={2} className="text-black">
          <span className="md:hidden">{truncatedAddress(2)}</span>
          <span className="hidden md:block">{truncatedAddress(4)}</span>
        </BodyText>
      </Button>
    </div>
  );
};

export const ConnectButton = ({
  className,
  text,
  size = "md",
}: {
  size?: SizeProps;
  text?: string;
  className?: string;
}) => {
  useAutoConnect();

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        if (!show) return;

        if (!isConnected || !address)
          return (
            <Button size={size} onClick={show} className={className}>
              {text ? text : "Connect"}
            </Button>
          );

        return (
          <CustomConnectButton
            size={size}
            address={address}
            ensName={ensName}
            onClick={show}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};
