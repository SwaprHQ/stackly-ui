import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const bodyTextStyles = cva([], {
  variants: {
    size: {
      3: ["text-md"],
      2: ["text-sm"],
      1: ["text-xs"],
    },
    weight: {
      bold: ["font-bold"],
      semibold: ["font-semibold"],
      medium: ["font-medium"],
    },
  },
  defaultVariants: {
    size: 2,
    weight: "semibold",
  },
});

interface BodyTextProps extends TextProps {
  size?: 1 | 2 | 3;
}

export const BodyText = ({
  children,
  size,
  className,
  weight,
  as,
}: BodyTextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent className={bodyTextStyles({ size, className, weight })}>
      {children}
    </TextComponent>
  );
};
