import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const captionTextStyles = cva([], {
  variants: {
    variant: {
      1: ["text-xs"],
      2: ["text-[10px] leading-[16px]"],
    },
    bold: {
      true: ["font-bold"],
      false: ["font-semibold"],
    },
  },
  defaultVariants: {
    variant: 2,
    bold: false,
  },
});

interface CaptionTextProps extends TextProps {
  variant?: 1 | 2;
}

export const CaptionText = ({
  children,
  variant,
  className,
  bold,
  as,
}: CaptionTextProps) => {
  const TextComponent = as || "p";
  return (
    <p className={captionTextStyles({ variant, className, bold })}>
      {children}
    </p>
  );
};
