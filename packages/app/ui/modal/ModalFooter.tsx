"use client";

import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ModalFooterProps extends PropsWithChildren {
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={twMerge(
        "flex items-center px-4 pb-6 pt-6 space-x-2 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
};
