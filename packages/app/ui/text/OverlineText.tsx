import { TextProps } from "@/ui/text/base";
import { cva } from "class-variance-authority";

const overlineTextStyles = cva(["uppercase text-[11px] leading-[16px]"], {
  variants: {
    weight: {
      bold: ["font-bold"],
      semibold: ["font-semibold"],
      medium: ["font-medium"],
    },
  },
  defaultVariants: {
    weight: "semibold",
  },
});

export const OverlineText = ({
  children,
  className,
  weight,
  as,
}: TextProps) => {
  const TextComponent = as || "p";
  return (
    <TextComponent className={overlineTextStyles({ className, weight })}>
      {children}
    </TextComponent>
  );
};
