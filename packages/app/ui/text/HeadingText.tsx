import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const headingTextStyles = cva([], {
  variants: {
    size: {
      6: ["text-[64px] leading-[72px]"],
      5: ["text-[52px] leading-[64px]"],
      4: ["text-[40px] leading-[56px]"],
      3: ["text-[32px] leading-[40px]"],
      2: ["text-[26px] leading-[40px]"],
      1: ["text-[20px] leading-[32px]"],
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

interface HeadingTextProps extends TextProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const HeadingText = ({
  children,
  size,
  className,
  weight,
  as,
}: HeadingTextProps) => {
  const TextComponent = as || "h4";
  return (
    <TextComponent className={headingTextStyles({ size, weight, className })}>
      {children}
    </TextComponent>
  );
};
