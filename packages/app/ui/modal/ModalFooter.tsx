"use client";

import { PropsWithChildren } from "react";

export const ModalFooter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center px-4 py-6 space-x-2 md:px-6">
      {children}
    </div>
  );
};
