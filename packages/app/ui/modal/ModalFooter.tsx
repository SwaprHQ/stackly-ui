"use client";

import { PropsWithChildren } from "react";

export const ModalFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center px-4 pt-2 pb-5 space-x-2">{children}</div>
  );
};
