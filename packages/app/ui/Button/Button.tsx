import type { ButtonHTMLAttributes } from "react";
import { cx } from "class-variance-authority";

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
  const rootClassName = cx("btn", className);

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
}
