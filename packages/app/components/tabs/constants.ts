import { twMerge } from "tailwind-merge";

import { buttonStyles } from "@/ui";

export const tabButtonStyles = twMerge(
  buttonStyles({ variant: "secondary" }),
  "bg-transperant border border-transparent text-em-high font-semibold ui-selected:bg-surface-75 ui-not-selected:text-em-low  hover:bg-surface-50 hover:border-surface-75 focus:ring-0"
);
