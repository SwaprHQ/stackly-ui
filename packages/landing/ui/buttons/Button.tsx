import React, { forwardRef } from "react";
import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";
import { Icon } from "@/ui/icon/Icon";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonBaseProps {
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      size = "md",
      variant,
      width,
      disabled,
      onClick,
      active,
      iconLeft,
      iconRight,
      id,
      ...rest
    } = props;

    return (
      <button
        id={id}
        onClick={onClick}
        disabled={disabled}
        className={twMerge(
          buttonStyles({
            size,
            variant,
            width,
            disabled,
            active,
            className,
          })
        )}
        ref={ref}
        {...rest}
      >
        {iconLeft && <Icon size={getIconSize(size)} name={iconLeft} />}
        {children && children}
        {iconRight && <Icon size={getIconSize(size)} name={iconRight} />}
      </button>
    );
  }
);

Button.displayName = "Button";
