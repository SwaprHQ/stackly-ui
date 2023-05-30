import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const headingTextStyles = cva([], {
  variants: {
    variant: {
      1: ["text-[64px] leading-[72px]"],
      2: ["text-[52px] leading-[64px]"],
      3: ["text-[40px] leading-[56px]"],
      4: ["text-[32px] leading-[40px]"],
      5: ["text-[26px] leading-[40px]"],
      6: ["text-[20px] leading-[32px]"],
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

interface HeadingTextProps extends TextProps {
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const HeadingText = ({
  children,
  variant,
  className,
  bold,
  as,
}: HeadingTextProps) => {
  const TextComponent = as || "h4";
  return (
    <TextComponent className={headingTextStyles({ variant, className, bold })}>
      {children}
    </TextComponent>
  );
};
