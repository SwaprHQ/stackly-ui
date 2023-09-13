import { TextProps, boldStyles } from "@/ui/text/base";
import { cva, cx } from "class-variance-authority";

const headingTextStyles = cva([], {
  variants: {
    size: {
      6: ["text-[64px] leading-[72px]"],
      5: ["text-[52px] leading-[64px]"],
      4: ["text-[26px] leading-[40px] md:text-[40px] md:leading-[56px]"],
      3: ["text-xl leading-[32px] md:text-[32px] md:leading-[40px]"],
      2: ["text-[20px] leading-8 md:text-[26px] md:leading-[40px]"],
      1: ["text-[18px] md:text-[20px] md:leading-[32px]"],
    },
  },
  defaultVariants: {
    size: 1,
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
    <TextComponent
      className={cx(
        boldStyles({ weight }),
        headingTextStyles({ size, className })
      )}
    >
      {children}
    </TextComponent>
  );
};
