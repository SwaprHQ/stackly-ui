import { TextProps, boldStyles } from "@/ui/text/base";
import { cx } from "class-variance-authority";

export const OverlineText = ({
  children,
  className,
  weight,
  as,
}: TextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent
      className={cx(
        "uppercase text-[11px] leading-[16px]",
        className,
        boldStyles({ weight })
      )}
    >
      {children}
    </TextComponent>
  );
};
