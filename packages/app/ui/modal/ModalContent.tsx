"use client";

import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

interface ModalContentProps extends PropsWithChildren {
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return (
    <div className={twMerge("px-4 mt-5 md:px-6", className)}>{children}</div>
  );
}
