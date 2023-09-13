"use client";

import { Icon } from "@/ui";
import { cx } from "class-variance-authority";
import { PropsWithChildren, useState } from "react";

interface QAndAAccordionProps extends PropsWithChildren {
  question: string;
  startOpen?: boolean;
}

export const QAndAAccordion = ({
  question,
  children,
  startOpen,
}: QAndAAccordionProps) => {
  const [isOpen, setIsOpen] = useState(startOpen ?? false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={cx(
        "px-6 py-3 space-y-4 bg-white border cursor-pointer rounded-xl hover:bg-surface-25",
        {
          "shadow-md": isOpen,
          "shadow-sm": !isOpen,
        }
      )}
      onClick={toggle}
    >
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold md:text-xl">{question}</p>
        <Icon name={isOpen ? "caret-up" : "caret-down"} />
      </div>
      {isOpen && (
        <div className="space-y-3 text-lg font-medium text-em-med">
          {children}
        </div>
      )}
    </div>
  );
};
