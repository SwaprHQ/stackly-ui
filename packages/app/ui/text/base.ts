import { ElementType, ReactNode } from "react";

export interface TextProps {
  className?: string;
  children: ReactNode;
  weight?: "medium" | "semibold" | "bold";
  as?: ElementType;
}
