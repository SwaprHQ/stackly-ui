import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const titleTextStyles = cva([], {
  variants: {
    size: {
      2: ["text-lg"],
      1: ["text-md"],
    },
  },
  defaultVariants: {
    size: 1,
  },
});

interface TitleTextProps extends TextProps {
  size?: 1 | 2;
}

export const TitleText = ({
  children,
  size,
  className,
  weight,
  as,
}: TitleTextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent
      className={cx(
        boldStyles({ weight }),
        titleTextStyles({ size, className })
      )}
    >
      {children}
    </TextComponent>
  );
};
