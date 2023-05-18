"use client";

import Link from "next/link";
import { ButtonBaseProps, ButtonContent, buttonStyles } from "./Button";

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
}

export function ButtonLink({
  children,
  className,
  size,
  action,
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
      id={id}
      href={href}
      tabIndex={0}
      className={buttonStyles({
        size,
        action,
        width,
        disabled,
        active,
        className,
      })}
    >
      <ButtonContent iconRight={iconRight} iconLeft={iconLeft} size={size}>
        {children}
      </ButtonContent>
    </Link>
  );
}
