import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const displayTextStyles = cva([], {
  variants: {
    size: {
      3: ["text-[104px] leading-[120px]"],
      2: ["text-[88px] leading-[96px]"],
      1: ["text-[74px] leading-[88px]"],
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

interface DisplayTextProps extends TextProps {
  size?: 1 | 2 | 3;
}

export const DisplayText = ({
  children,
  size,
  className,
  weight,
  as,
}: DisplayTextProps) => {
  const TextComponent = as || "h2";
  return (
    <TextComponent className={displayTextStyles({ size, className, weight })}>
      {children}
    </TextComponent>
  );
};
