import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const captionTextStyles = cva([], {
  variants: {
    size: {
      2: ["text-xs"],
      1: ["text-[10px] leading-[16px]"],
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

interface CaptionTextProps extends TextProps {
  size?: 1 | 2;
}

export const CaptionText = ({
  children,
  size,
  className,
  weight,
  as,
}: CaptionTextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent className={captionTextStyles({ size, className, weight })}>
      {children}
    </TextComponent>
  );
};
