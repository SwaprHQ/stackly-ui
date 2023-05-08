import type { LinkHTMLAttributes } from "react";
import cn from "clsx";
import NextLink from "next/link";

interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  className?: string;
}

export default function Link({
  children,
  className = "",
  external,
  href,
  ...props
}: LinkProps) {
  const rootClassName = cn(className);

  if (external) {
    const externalProps = { target: "_blank", rel: "noopener noreferrer" };
    return (
      <a className={rootClassName} {...props} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <NextLink className={rootClassName} href={href} {...props}>
      {children}
    </NextLink>
  );
}
