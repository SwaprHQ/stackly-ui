"use client";

import { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { buttonStyles, SizeProps } from "./base";

interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: SizeProps;
}

const chipButtonStyles = cva(["rounded-full px-3 py-2 space-x-1.5 text-xs"], {
  variants: {
    active: {
      true: ["bg-gray-75"],
    },
    size: {
      icon: "p-2",
      lg: "px-14 py-3 md:py-4 text-lg md:px-24 space-x-4",
      md: "px-8 md:px-12 py-2 space-x-2",
      sm: "px-4 py-2 text-sm space-x-2",
      xs: "px-2 py-1 text-xs space-x-1",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export function ChipButton({
  active,
  children,
  className,
  disabled,
  id,
  onClick,
  size,
}: ChipButtonProps) {
  return (
    <button
      className={twMerge(
        buttonStyles({
          size,
          variant: "tertiary",
          width: null,
          disabled,
          active,
          className,
        }),
        chipButtonStyles({ active, size })
      )}
      disabled={disabled}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
