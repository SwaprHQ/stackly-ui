import { ElementType, ReactNode } from "react";
import { cva } from "class-variance-authority";

export interface TextProps {
  className?: string;
  children: ReactNode;
  weight?: "medium" | "semibold" | "bold";
  as?: ElementType;
}

export const boldStyles = cva([], {
  variants: {
    weight: {
      bold: ["font-bold"],
      semibold: ["font-semibold"],
      medium: ["font-medium"],
    },
  },
  defaultVariants: {
    weight: "semibold",
  },
});
