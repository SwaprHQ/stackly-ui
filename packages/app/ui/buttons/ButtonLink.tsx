"use client";

import Link from "next/link";
import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";
import { Icon } from "@/ui/icon/Icon";

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
  return (
    <Link
      id={id}
      href={href}
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
