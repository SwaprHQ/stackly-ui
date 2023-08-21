import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { IconName } from "@/ui";

export const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "rounded-lg cursor-pointer select-none font-medium",
    "active:ring-4",
    "disabled:bg-surface-75 disabled:text-em-disabled disabled:cursor-not-allowed disabled:ring-0",
    "focus:outline-none focus:ring-4",
  ],
  {
    variants: {
      size: {
        lg: "px-14 py-3 md:py-4 text-lg md:px-24 space-x-4",
        md: "px-8 md:px-12 py-2 space-x-2",
        sm: "px-4 py-2 text-sm space-x-2",
        xs: "px-2 py-1 text-xs space-x-1",
        icon: "p-2",
      },
      variant: {
        primary: [
          "bg-primary-400 text-em-high hover:bg-primary-500 active:ring-primary-200 shadow-xs",
          "focus:bg-primary-500 focus:ring-primary-200",
        ],
        secondary: [
          "bg-surface-50 text-em-med hover:bg-gray-100 active:ring-gray-200",
          "focus:bg-gray-100 focus:ring-gray-200",
        ],
        tertiary: [
          "bg-white text-em-med hover:bg-surface-75 border active:ring-gray-100 shadow-xs",
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
        variant: ["primary"],
        active: true,
        class: "bg-primary-500 ring-primary-200",
      },
      {
        variant: ["secondary"],
        active: true,
        class: "bg-gray-100 ring-gray-200",
      },
      {
        variant: ["tertiary"],
        active: true,
        class: "bg-surface-75 ring-gray-100",
      },
      {
        variant: ["quaternary"],
        active: true,
        class: "bg-surface-50 ring-surface-75",
      },
    ],
    defaultVariants: {
      active: false,
      variant: "primary",
      size: "md",
      width: "normal",
      disabled: false,
    },
  }
);

export type SizeProps = "xs" | "sm" | "md" | "lg" | "icon";

export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  className?: string;
  size?: SizeProps;
  width?: "normal" | "fit" | "full";
  disabled?: boolean;
  href?: string;
  active?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  id?: string;
}

export const iconSizeMap: Record<SizeProps, any> = {
  xs: 16,
  sm: 18,
  icon: 20,
  md: 22,
  lg: 26,
};

export const getIconSize = (size?: SizeProps) =>
  size ? iconSizeMap[size] : iconSizeMap["icon"];
