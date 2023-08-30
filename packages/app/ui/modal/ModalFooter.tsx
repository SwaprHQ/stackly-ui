"use client";

import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
interface ModalFooterProps extends PropsWithChildren {
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={twMerge("flex items-center px-4 py-5 space-x-2", className)}
    >
      {children}
    </div>
  );
};
