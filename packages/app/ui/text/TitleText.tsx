import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const titleTextStyles = cva([], {
  variants: {
    size: {
      2: ["text-lg"],
      1: ["text-md"],
    },
    weight: {
      bold: ["font-bold"],
      semibold: ["font-semibold"],
      medium: ["font-medium"],
    },
  },
  defaultVariants: {
    size: 1,
    weight: "semibold",
  },
});

interface TitleTextProps extends TextProps {
  size?: 1 | 2;
}

export const TitleText = ({
  children,
  size,
  className,
  weight,
}: TitleTextProps) => (
  <p className={titleTextStyles({ size, weight, className })}>{children}</p>
);
