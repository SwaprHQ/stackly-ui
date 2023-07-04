"use client";

import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const radioButtonStyles = cva(
  [
    "flex items-center justify-center rounded-full px-3 py-2 space-x-1.5",
    "cursor-pointer select-none font-medium text-xs",
    "disabled:bg-surface-75 disabled:text-em-disabled disabled:cursor-not-allowed disabled:ring-0",
    "focus:outline-none"
  ],
  {
    variants: {
      checked: {
        true: [
          "bg-primary-400 text-em-high hover:bg-primary-500 border border-primary-400 active:ring-primary-200 shadow-xs",
          "focus:bg-primary-500 focus:ring-primary-200"
        ],
        false: [
          "bg-white text-em-med hover:bg-surface-75 border active:ring-gray-100 shadow-xs",
          "focus:bg-surface-75 focus:ring-gray-100"
        ]
      }
    },
    defaultVariants: {
      checked: false
    }
  }
);

export function RadioButton({
  className,
  id,
  children,
  value,
  checked,
  name,
  onChange
}: RadioButtonProps) {
  return (
    <div className={twMerge("flex", className)}>
      <input
        type="radio"
        value={value}
        id={id}
        onChange={onChange}
        checked={checked}
        name={name}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={radioButtonStyles({
          checked
        })}
      >
        {children}
      </label>
    </div>
  );
}
