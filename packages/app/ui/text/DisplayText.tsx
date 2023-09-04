import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const displayTextStyles = cva([], {
  variants: {
    size: {
      3: ["text-8xl md:text-[104px] md:leading-[120px]"],
      2: ["text-7xl md:text-[88px] md:leading-[96px]"],
      1: ["text-6xl md:text-[74px] md:leading-[88px]"],
    },
  },
  defaultVariants: {
    size: 1,
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
    <TextComponent
      className={cx(
        boldStyles({ weight }),
        displayTextStyles({ size, className })
      )}
    >
      {children}
    </TextComponent>
  );
};
