"use client";

import { PropsWithChildren } from "react";

export function ModalContent({ children }: PropsWithChildren) {
  return <div className="px-4 mt-5">{children}</div>;
}
