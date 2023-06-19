import { isAddress } from "viem";
import { cva } from "class-variance-authority";
import { Token } from "@/models/order";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { twMerge } from "tailwind-merge";

interface TokenIconProps {
  token: Token;
  className?: string;
  size?: "lg" | "md" | "sm" | "xs";
}

const TOKEN_LIST_BY_CHAIN_URL: { [chainId: number]: string } = {
  1: "https://tokens.1inch.eth.link/",
  100: "https://tokens.honeyswap.org/",
};

type TokenFromList = {
  address: string;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
};

const GNOSIS_CHAIN_ID = 100;

export const TokenIcon = ({ token, className, size }: TokenIconProps) => {
  const { chain } = useNetwork();
  const [tokensList, setTokensList] = useState<TokenFromList[]>([]);

  const setupTokenList = useCallback(async () => {
    async function getTokensListData() {
      const res = await fetch(
        chain
          ? TOKEN_LIST_BY_CHAIN_URL[chain.id]
          : TOKEN_LIST_BY_CHAIN_URL[GNOSIS_CHAIN_ID]
      );
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
      return res.json();
    }
    const data = await getTokensListData();
    setTokensList(data.tokens);
  }, [chain]);

  function getToken(tokenAddress: string) {
    return tokensList.find(
      (element) => element.address.toUpperCase() === tokenAddress.toUpperCase()
    );
  }

  function getTokenLogoURL() {
    return getToken(token.id)?.logoURI ?? "";
  }

  useEffect(() => {
    setupTokenList();
  }, [setupTokenList]);

  if (!token.id || !isAddress(token.id) || !getToken(token.id))
    return <DefaultTokenIcon token={token} className={className} size={size} />;

  return (
    <Image
      src={getTokenLogoURL()}
      className={tokenIconStyles({ size, className })}
      alt={token.name}
      width={54}
      height={54}
    />
  );
};

const DefaultTokenIcon = ({ token, size, className }: TokenIconProps) => (
  <div
    className={twMerge(
      tokenIconStyles({ size }),
      className,
      "bg-primary-100 border border-primary-200 break-all"
    )}
  >
    {token.symbol}
  </div>
);

export const tokenIconStyles = cva(
  ["flex items-center justify-center", "rounded-full bg-surface-50"],
  {
    variants: {
      size: {
        lg: ["w-10 h-10 text-[7px]"],
        md: ["w-8 h-8 text-[6px]"],
        sm: ["w-6 h-6 text-[5px]"],
        xs: ["w-5 h-5 text-[4px]"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
