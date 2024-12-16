"use client";

import { ChainId, WETH, WXDAI } from "@stackly/sdk";
import { ConnectKitButton } from "connectkit";
import { useBalance } from "wagmi";
import { formatUnits } from "viem";

import { BodyText, Button, SizeProps } from "@/ui";
import { useAutoConnect } from "@/hooks";
import { useNetworkContext } from "@/contexts";
import { Avatar } from "@/components/Avatar";

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
  const { chainId } = useNetworkContext();

  const TOKEN_BY_CHAIN: { [chainId: number]: string } = {
    [ChainId.ETHEREUM]: WETH[ChainId.ETHEREUM].address,
    [ChainId.GNOSIS]: WXDAI.address,
    [ChainId.ARBITRUM]: WETH[ChainId.ARBITRUM].address,
    [ChainId.BASE]: WETH[ChainId.BASE].address,
  };

  const { data: balance } = useBalance({
    address: address,
    token: TOKEN_BY_CHAIN[chainId] as `0x${string}`,
  });

  const truncatedAddress = (size: number) =>
    `${address.slice(0, size)}...${address.slice(
      address.length - size,
      address.length
    )}`;

  const formattedBalance = (balanceData: NonNullable<typeof balance>) =>
    balanceData.value === BigInt(0)
      ? `0 ${balanceData.symbol}`
      : `${formatUnits(balanceData.value, balanceData.decimals).substring(
          0,
          5
        )} ${balanceData.symbol}`;

  return (
    <div className="flex bg-gray-alpha-50 rounded-xl p-0.5 justify-center items-center md:space-x-3">
      {balance && (
        <BodyText
          size={2}
          className="hidden ml-3 min-w-max text-em-med md:block"
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
        className="flex rounded-xl border-none shadow-sm hover:bg-surface-25 focus:bg-white focus:ring-0 active:ring-0"
      >
        <Avatar address={address} ensName={ensName} />
        <BodyText size={2} className="text-black">
          {ensName ? (
            <>{ensName}</>
          ) : (
            <>
              <span className="md:hidden">{truncatedAddress(2)}</span>
              <span className="hidden md:block">{truncatedAddress(4)}</span>
            </>
          )}
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
