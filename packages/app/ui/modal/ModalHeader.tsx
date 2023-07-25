"use client";

import { PropsWithChildren } from "react";

import { cx } from "class-variance-authority";
import { Dialog } from "@headlessui/react";

interface ModalHeaderProps extends PropsWithChildren {
  withDivider?: boolean;
}

export function ModalHeader({
  children,
  withDivider = false,
}: ModalHeaderProps) {
  return (
    <Dialog.Title
      as="div"
      className={cx("flex items-center justify-between w-full px-4 py-3", {
        "border-b border-surface-50": withDivider,
      })}
    >
      {children}
    </Dialog.Title>
  );
}
