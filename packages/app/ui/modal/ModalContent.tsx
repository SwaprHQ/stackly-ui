"use client";

import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface ModalContentProps extends PropsWithChildren {
  className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
  return <div className={twMerge("px-4 pt-5 mb-3", className)}>{children}</div>;
}
