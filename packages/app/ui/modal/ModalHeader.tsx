"use client";

import { PropsWithChildren } from "react";

import { Dialog } from "@headlessui/react";

export function ModalHeader({ children }: PropsWithChildren) {
  return (
    <Dialog.Title
      as="div"
      className="flex items-center justify-between w-full px-4 py-3 border-b border-surface-50"
    >
      {children}
    </Dialog.Title>
  );
}
