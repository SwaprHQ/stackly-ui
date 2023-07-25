"use client";

import { cx } from "class-variance-authority";
import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface ModalContentProps extends PropsWithChildren {
  className?: string;
  withDivider?: boolean;
}

export function ModalContent({
  children,
  className,
  withDivider = false,
}: ModalContentProps) {
  return (
    <div
      className={twMerge(
        cx("px-4 mt-5", className, {
          "border-b border-surface-50": withDivider,
        })
      )}
    >
      {children}
    </div>
  );
}
