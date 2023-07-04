import { isAddress } from "viem";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { useNetwork } from "wagmi";
import { twMerge } from "tailwind-merge";
import { useTokenListContext } from "@/context/TokenListContext";
import { Token } from "@/models/token/types";
import { useState } from "react";

interface TokenIconProps {
  className?: string;
  size?: "lg" | "md" | "sm" | "xs";
  token: Token;
}

export const TokenIcon = ({
  className,
  size = "sm",
  token
}: TokenIconProps) => {
  const { getTokenFromList, getTokenLogoURL } = useTokenListContext();
  const [isImgBroken, setIsImgBroken] = useState<Boolean>(false);

  const getTokenMethodsUndefined = !getTokenFromList || !getTokenLogoURL;
  const invalidAddress = !isAddress(token.address);
  const noTokenOnTheList =
    !getTokenMethodsUndefined && !getTokenFromList(token.address);

  if (
    getTokenMethodsUndefined ||
    invalidAddress ||
    noTokenOnTheList ||
    isImgBroken
  )
    return <DefaultTokenIcon token={token} className={className} size={size} />;

  return (
    <Image
      src={getTokenLogoURL(token.address)}
      className={tokenIconStyles({ size, className })}
      alt={token.name}
      width={54}
      height={54}
      onError={() => {
        setIsImgBroken(true);
      }}
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
        xs: ["w-5 h-5 text-[4px]"]
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
);
