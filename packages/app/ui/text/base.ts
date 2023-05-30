import { ElementType, ReactNode } from "react";

export interface TextProps {
  className?: string;
  children: ReactNode;
  bold?: boolean;
  as?: ElementType;
}
