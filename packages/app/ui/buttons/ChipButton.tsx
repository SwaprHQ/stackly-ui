"use client";

import { ButtonHTMLAttributes } from "react";
import { buttonStyles } from "./base";
import { cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const chipButtonStyles = cva(["rounded-full px-3 py-2 space-x-1.5 text-xs"], {
  variants: {
    active: {
      true: ["bg-gray-75"],
    },
  },
});

export function ChipButton({
  children,
  className,
  disabled,
  onClick,
  active,
  id,
}: ChipButtonProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        cx(
          buttonStyles({
            size: "md",
            action: "tertiary",
            width: null,
            disabled,
            active,
            className,
          }),
          chipButtonStyles({ active })
        )
      )}
    >
      {children}
    </button>
  );
}
