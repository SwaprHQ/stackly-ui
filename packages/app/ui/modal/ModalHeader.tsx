"use client";

import { PropsWithChildren } from "react";

import { Dialog } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

interface ModalHeaderProps extends PropsWithChildren {
  className?: string;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <Dialog.Title
      as="div"
      className={twMerge(
        "flex items-center justify-between w-full px-4 py-4 border-b md:px-6 border-surface-50",
        className
      )}
    >
      {children}
    </Dialog.Title>
  );
}
