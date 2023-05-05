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
  const actionTypes = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link",
  };

  const rootClassName = cn("btn", action && actionTypes[action], className);

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
}
