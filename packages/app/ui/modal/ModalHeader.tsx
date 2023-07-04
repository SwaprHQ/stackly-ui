"use client";

import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";

interface ModalHeaderProps extends PropsWithChildren {
  className?: string;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  return (
    <Dialog.Title as="div" className={className}>
      {children}
    </Dialog.Title>
  );
}
