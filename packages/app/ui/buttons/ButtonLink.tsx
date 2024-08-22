"use client";

import Link from "next/link";

import { Icon } from "@/ui/icon/Icon";
import { useNetworkContext } from "@/contexts";

import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  passHref?: boolean;
  target?: string;
}

export function ButtonLink({
  children,
  className,
  size,
  variant,
  width,
  disabled,
  href,
  active,
  iconLeft,
  iconRight,
  id,
  passHref,
  target,
}: ButtonLinkProps) {
  const { chainId } = useNetworkContext();

  return (
    <Link
      id={id}
      href={{
        pathname: href,
        query: `chainId=${chainId}`,
      }}
      tabIndex={0}
      className={buttonStyles({
        size,
        variant,
        width,
        disabled,
        active,
        className,
      })}
      passHref={passHref}
      target={target}
    >
      {iconLeft && <Icon size={getIconSize(size)} name={iconLeft} />}
      {children && <div>{children}</div>}
      {iconRight && <Icon size={getIconSize(size)} name={iconRight} />}
    </Link>
  );
}
