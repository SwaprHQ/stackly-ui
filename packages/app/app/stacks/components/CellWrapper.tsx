import { PropsWithChildren } from "react";

export const CellWrapper = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-end space-x-1 min-w-max">
    {children}
  </div>
);
