"use client";

import { ReactNode } from "react";

interface ModalFooterProps {
  children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex items-center px-4 py-5 space-x-2">{children}</div>
  );
}
