"use client";

import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";

export function ModalHeader({ children }: PropsWithChildren) {
  return (
    <Dialog.Title
      as="div"
      className="flex items-center w-full px-4 py-2 border-b border-surface-50"
    >
      {children}
    </Dialog.Title>
  );
}
