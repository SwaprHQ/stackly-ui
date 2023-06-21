import { isAddress } from "viem";
import { cva } from "class-variance-authority";
import Image from "next/image";
import { useNetwork } from "wagmi";
import { twMerge } from "tailwind-merge";
import { useTokenListContext } from "@/context/TokenListContext";
import { Token } from "@/models/token/types";

interface TokenIconProps {
  token: Token;
  className?: string;
  size?: "lg" | "md" | "sm" | "xs";
}

export const TokenIcon = ({ token, className, size }: TokenIconProps) => {
  const { getTokenFromList, getTokenLogoURL } = useTokenListContext();

  const getTokenMethodsUndefined = !getTokenFromList || !getTokenLogoURL;
  const invalidAddress = !isAddress(token.id);
  const noTokenOnTheList =
    !getTokenMethodsUndefined && !getTokenFromList(token.id);

  if (getTokenMethodsUndefined || invalidAddress || noTokenOnTheList)
    return <DefaultTokenIcon token={token} className={className} size={size} />;

  return (
    <Image
      src={getTokenLogoURL(token.id)}
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
