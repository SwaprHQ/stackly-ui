"use client";

import { PropsWithChildren } from "react";

export const ModalFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center px-4 py-5 space-x-2">{children}</div>
  );
};
