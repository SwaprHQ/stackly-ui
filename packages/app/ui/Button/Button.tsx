import type { ButtonHTMLAttributes } from "react";
import cn from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  action?: "primary" | "secondary" | "ghost" | "link";
  className?: string;
}

export default function Button({
  children,
  className,
  action,
  ...props
}: ButtonProps) {
  const rootClassName = cn("btn", className);

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
}
