"use client";

import { Dialog } from "@headlessui/react";
import { PropsWithChildren } from "react";

export function ModalHeader({ children }: PropsWithChildren) {
  return (
    <Dialog.Title
      as="div"
      className="flex items-center justify-between w-full border-b border-surface-50 px-4 py-3"
    >
      {children}
    </Dialog.Title>
  );
}
