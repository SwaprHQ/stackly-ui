"use client";

import { ReactNode } from "react";

interface ModalContentProps {
  children: ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return <div className="px-4 mt-5">{children}</div>;
}
