import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const bodyTextStyles = cva([], {
  variants: {
    variant: {
      3: ["text-xs"],
      2: ["text-sm"],
      1: ["text-md"],
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

interface BodyTextProps extends TextProps {
  variant?: 1 | 2 | 3;
}

export const BodyText = ({
  children,
  variant,
  className,
  bold,
  as,
}: BodyTextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent className={bodyTextStyles({ variant, className, bold })}>
      {children}
    </TextComponent>
  );
};
