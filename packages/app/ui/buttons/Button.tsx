import React, { forwardRef } from "react";
import { ButtonBaseProps, buttonStyles, getIconSize } from "./base";
import { Icon } from "@/ui/icon/Icon";

interface ButtonProps extends ButtonBaseProps {
  onClick: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
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
      ...rest
    } = props;

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
        ref={ref}
        {...rest}
      >
        {iconLeft && <Icon size={getIconSize(size)} name={iconLeft} />}
        {children && <div>{children}</div>}
        {iconRight && <Icon size={getIconSize(size)} name={iconRight} />}
      </button>
    );
  }
);

Button.displayName = "Button";
