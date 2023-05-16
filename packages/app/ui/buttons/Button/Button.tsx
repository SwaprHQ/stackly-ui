"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { Icon, IconName } from "@/ui/Icon/Icon";

export const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "rounded-lg cursor-pointer font-medium space-x-3",
  ],
  {
    variants: {
      size: {
        lg: "px-14 py-3 md:py-4 text-lg md:px-24",
        md: "px-12 py-2",
        sm: "px-4 py-2 text-sm",
        icon: "p-2",
      },
      action: {
        primary: ["shadow"],
        secondary: ["bg-primary-75"],
        tertiary: [],
        quaternary: [],
      },
      active: {
        true: [],
        false: [],
      },
      width: {
        full: "w-full",
        fit: "w-fit",
        normal: "",
      },
      disabled: {
        true: ["shadow-none"],
      },
    },
    compoundVariants: [
      {
        action: ["primary"],
        active: true,
        disabled: false,
        class: "bg-primary-500 text-em-high ring-4 ring-primary-200",
      },
      {
        action: ["primary"],
        disabled: false,
        class:
          "bg-primary-400 text-em-high hover:bg-primary-500 active:ring-4 active:ring-primary-200",
      },
      {
        action: ["primary"],
        disabled: true,
        class: "bg-surface-75 text-em-disabled !cursor-not-allowed",
      },
    ],
    defaultVariants: {
      active: false,
      action: "primary",
      size: "md",
      width: "normal",
      disabled: false,
    },
  }
);

export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  action?: "primary" | "secondary" | "tertiary" | "quaternary";
  className?: string;
  size?: "sm" | "md" | "lg" | "icon";
  width?: "normal" | "fit" | "full";
  disabled?: boolean;
  href?: string;
  active?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
}

interface ButtonProps extends ButtonBaseProps {
  onClick: () => void;
}

export const ButtonContent = ({
  iconLeft,
  iconRight,
  children,
}: {
  iconLeft?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
}) => (
  <>
    {iconLeft && <Icon name={iconLeft} />}
    {children && <div>{children}</div>}
    {iconRight && <Icon name={iconRight} />}
  </>
);

export default function Button({
  children,
  className,
  size,
  action,
  width,
  disabled,
  onClick,
  active,
  iconLeft,
  iconRight,
}: ButtonProps) {
  return (
    <button
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
      <ButtonContent iconRight={iconRight} iconLeft={iconLeft}>
        {children}
      </ButtonContent>
    </button>
  );
}
