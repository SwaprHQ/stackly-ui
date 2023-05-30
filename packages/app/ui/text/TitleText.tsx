import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const titleTextStyles = cva([], {
  variants: {
    variant: {
      1: ["text-lg"],
      2: ["text-md"],
    },
    bold: {
      true: ["font-bold"],
      false: ["font-semibold"],
    },
  },
  defaultVariants: {
    variant: 1,
    bold: false,
  },
});

interface TitleTextProps extends TextProps {
  variant?: 1 | 2;
}

export const TitleText = ({
  children,
  variant,
  className,
  bold,
}: TitleTextProps) => (
  <p className={titleTextStyles({ variant, bold, className })}>{children}</p>
);
