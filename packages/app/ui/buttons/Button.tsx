"use client";

import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";
import { Icon } from "@/ui/icon/Icon";

interface ButtonProps extends ButtonBaseProps {
  onClick: () => void;
}

export function Button({
  children,
  className,
  size = "md",
  action,
  width,
  disabled,
  onClick,
  active,
  iconLeft,
  iconRight,
  id,
}: ButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles({
        size,
        action,
        width,
        disabled,
        active,
        className,
      })}
    >
      {iconLeft && <Icon size={getIconSize(size)} name={iconLeft} />}
      {children && <div>{children}</div>}
      {iconRight && <Icon size={getIconSize(size)} name={iconRight} />}
    </button>
  );
}
