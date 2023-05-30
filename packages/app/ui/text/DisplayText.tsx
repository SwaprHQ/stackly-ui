import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const displayTextStyles = cva([], {
  variants: {
    variant: {
      1: ["text-[104px] leading-[120px]"],
      2: ["text-[88px] leading-[96px]"],
      3: ["text-[74px] leading-[88px]"],
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

interface DisplayTextProps extends TextProps {
  variant?: 1 | 2 | 3;
}

export const DisplayText = ({
  children,
  variant,
  className,
  bold,
  as,
}: DisplayTextProps) => {
  const Component = as || "h2";
  return (
    <Component className={displayTextStyles({ variant, className, bold })}>
      {children}
    </Component>
  );
};
