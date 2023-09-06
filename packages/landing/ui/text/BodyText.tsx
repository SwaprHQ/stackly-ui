import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const bodyTextStyles = cva([], {
  variants: {
    size: {
      3: ["text-base"],
      2: ["text-sm"],
      1: ["text-xs"],
      responsive: ["text-sm md:text-base"],
    },
  },
  defaultVariants: {
    size: 2,
  },
});

interface BodyTextProps extends TextProps {
  size?: 1 | 2 | 3 | "responsive";
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
    <TextComponent
      className={cx(
        boldStyles({ weight }),
        bodyTextStyles({ size, className })
      )}
    >
      {children}
    </TextComponent>
  );
};
