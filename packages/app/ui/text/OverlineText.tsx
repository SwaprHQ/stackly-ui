import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const overlineTextStyles = cva(["uppercase text-[11px] leading-[16px]"], {
  variants: {
    bold: {
      true: ["font-bold"],
      false: ["font-semibold"],
    },
  },
  defaultVariants: {
    bold: false,
  },
});

export const OverlineText = ({ children, className, bold, as }: TextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent className={overlineTextStyles({ className, bold })}>
      {children}
    </TextComponent>
  );
};
