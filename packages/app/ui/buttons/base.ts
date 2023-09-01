import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { IconName } from "@/ui";

export const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "cursor-pointer select-none font-medium",
    "disabled:bg-surface-75 disabled:text-em-disabled disabled:cursor-not-allowed disabled:ring-0",
    "focus:outline-none focus:ring-4",
    "active:ring-4",
  ],
  {
    variants: {
      size: {
        lg: "px-4 py-3 space-x-[10px] rounded-xl leading-6",
        md: "px-3 py-2 space-x-2 text-sm rounded-xl leading-6",
        sm: "px-3 py-2 space-x-[6px] text-sm rounded-lg leading-4",
        xs: "px-2 py-1 space-x-1 text-xs rounded-[6px] leading-4",
        icon: "p-2 rounded-xl",
      },
      variant: {
        primary: [
          "bg-primary-400 text-em-high hover:bg-primary-500 active:ring-primary-200 shadow-xs",
          "focus:bg-primary-500 focus:ring-primary-200",
        ],
        secondary: [
          "bg-surface-50 text-em-med hover:bg-gray-100 active:ring-surface-50",
          "focus:bg-gray-100 focus:ring-surface-50",
        ],
        tertiary: [
          "bg-white text-em-med hover:bg-surface-75 border border-surface-50  active:ring-surface-50 shadow-xs",
          "focus:bg-surface-75 focus:ring-surface-50",
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
        class: "bg-gray-100 ring-surface-50",
      },
      {
        variant: ["tertiary"],
        active: true,
        class: "bg-surface-75 ring-surface-50",
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
  children?: ReactNode;
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
  xs: 13,
  sm: 16,
  icon: 20,
  md: 18,
  lg: 20,
};

export const getIconSize = (size?: SizeProps) =>
  size ? iconSizeMap[size] : iconSizeMap["icon"];
