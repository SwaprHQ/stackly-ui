"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Address, http } from "viem";
import { mainnet } from "viem/chains";
import { createConfig, fallback, useEnsAvatar } from "wagmi";
import { RPC_LIST } from "@/constants";

interface AvatarProps {
  address: Address;
  className?: string;
  size?: number;
  ensName?: string;
}

const mainnetConfigForENS = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: fallback([http(RPC_LIST[mainnet.id]), http()]),
  },
});

export const Avatar = ({
  address,
  ensName,
  className,
  size = 24,
}: AvatarProps) => {
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    config: mainnetConfigForENS,
  });

  const GRADIENT_BASED_ON_ADDRESS_URL = "https://avatars.jakerunzer.com";
  const ENS_METADATA_AVATAR_URL = "https://metadata.ens.domains/mainnet/avatar";

  const avatarGradientUrl = `${GRADIENT_BASED_ON_ADDRESS_URL}/${address}`;
  const avatarEnsUrl = `${ENS_METADATA_AVATAR_URL}/${ensName}`;
  const avatarUrl = ensName && ensAvatar ? avatarEnsUrl : avatarGradientUrl;

  return (
    <Image
      src={avatarUrl}
      alt={`${ensName} avatar`}
      width={size}
      height={size}
      className={twMerge(
        "bg-cover rounded-full size-6 bg-outline-low-em",
        className
      )}
    />
  );
};
