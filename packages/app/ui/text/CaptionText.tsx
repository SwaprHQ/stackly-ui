import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const captionTextStyles = cva([], {
  variants: {
    size: {
      2: ["text-xs"],
      1: ["text-[10px] leading-[16px]"],
    },
  },
  defaultVariants: {
    size: 2,
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
    <TextComponent
      className={cx(
        boldStyles({ weight }),
        captionTextStyles({ size, className })
      )}
    >
      {children}
    </TextComponent>
  );
};
