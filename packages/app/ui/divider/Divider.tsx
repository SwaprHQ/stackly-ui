"use client";

import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
  vertical?: boolean;
}

export const Divider = ({ className, vertical = false }: DividerProps) =>
  vertical ? (
    <div className={twMerge("border-surface-50 h-full border-l", className)} />
  ) : (
    <hr className={twMerge("border-surface-50 w-full border-t", className)} />
  );
