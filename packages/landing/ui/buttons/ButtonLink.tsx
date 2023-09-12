"use client";

import Link from "next/link";
import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";
import { Icon } from "@/ui/icon/Icon";
import { Ref } from "react";

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  target?: string;
  ref?: Ref<HTMLAnchorElement>;
}

export function ButtonLink({
  ref,
  target,
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
}: ButtonLinkProps) {
  return (
    <Link
      ref={ref}
      target={target}
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
    >
      {iconLeft && <Icon size={getIconSize(size)} name={iconLeft} />}
      {children && <div>{children}</div>}
      {iconRight && <Icon size={getIconSize(size)} name={iconRight} />}
    </Link>
  );
}
