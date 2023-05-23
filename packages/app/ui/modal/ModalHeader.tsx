"use client";

import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalHeaderProps {
  children: ReactNode;
}

export function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <Dialog.Title
      as="div"
      className="flex items-center w-full px-4 py-1 border-b border-surface-50"
    >
      {children}
    </Dialog.Title>
  );
}
