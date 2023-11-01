"use client";

import { PropsWithChildren, useState } from "react";

import { Icon } from "@/ui";

interface QAndAAccordionProps extends PropsWithChildren {
  onClick?: (args?: any) => void;
  question: string;
  startOpen?: boolean;
}

export const QAndAAccordion = ({
  children,
  onClick,
  question,
  startOpen,
}: QAndAAccordionProps) => {
  const [isOpen, setIsOpen] = useState(startOpen ?? false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`
      bg-white hover:bg-surface-25
      border
      cursor-pointer
      px-6 py-3
      rounded-xl
      space-y-4
      ${isOpen ? "shadow-md" : "shadow-sm"}
      `}
      onClick={() => {
        if (onClick && !isOpen) onClick();
        toggle();
      }}
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
