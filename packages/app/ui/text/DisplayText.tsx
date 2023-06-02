import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const displayTextStyles = cva([], {
  variants: {
    size: {
      3: ["text-[104px] leading-[120px]"],
      2: ["text-[88px] leading-[96px]"],
      1: ["text-[74px] leading-[88px]"],
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
