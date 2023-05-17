"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { Icon, IconName } from "@/ui/Icon/Icon";

export const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "rounded-lg cursor-pointer select-none font-medium",
    "space-x-3",
    "active:ring-4",
    "disabled:bg-surface-75 disabled:text-em-disabled disabled:cursor-not-allowed disabled:ring-0",
    "focus:outline-none focus:ring-4",
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
        primary: [
          "bg-primary-400 text-em-high hover:bg-primary-500 active:ring-primary-200 shadow",
          "focus:bg-primary-500 focus:ring-primary-200",
        ],
        secondary: [
          "bg-surface-50 text-em-med hover:bg-gray-100 active:ring-gray-200 shadow-sm",
          "focus:bg-gray-100 focus:ring-gray-200",
        ],
        tertiary: [
          "bg-white text-em-med hover:bg-surface-75 border active:ring-gray-100",
          "focus:bg-surface-75 focus:ring-gray-100",
        ],
        quaternary: [
          "text-em-med hover:bg-surface-50 active:ring-surface-75",
          "focus:bg-surface-50 focus:ring-surface-75",
        ],
      },
      active: {
        true: ["ring-4"],
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
        class: "bg-primary-500 ring-primary-200",
      },
      {
        action: ["secondary"],
        active: true,
        class: "bg-gray-100 ring-gray-200",
      },
      {
        action: ["tertiary"],
        active: true,
        class: "bg-surface-75 ring-gray-100",
      },
      {
        action: ["quaternary"],
        active: true,
        class: "bg-surface-50 ring-surface-75",
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
  id?: string;
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

export function Button({
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
      <ButtonContent iconRight={iconRight} iconLeft={iconLeft}>
        {children}
      </ButtonContent>
    </button>
  );
}
