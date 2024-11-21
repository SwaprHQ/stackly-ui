import { Input, InputProps, Field, Label } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { BodyText, CaptionText } from "../text";

interface TextInputxProps extends InputProps {
  className?: string;
  error?: string;
  id: string;
  label?: string;
  wrapperClassName?: string;
}

export const TextInput = ({
  className,
  error,
  id,
  label,
  onChange,
  placeholder,
  value,
  wrapperClassName,
  ...inputProps
}: TextInputxProps) => (
  <Field className={twMerge("flex flex-col gap-2", wrapperClassName)}>
    {label && (
      <Label htmlFor={id}>
        <BodyText className="text-em-low">{label}</BodyText>
      </Label>
    )}
    <Input
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={twMerge(
        [
          "border placeholder:text-sm w-full min-h-10 rounded-3xl px-3 py-2",
          "border-surface-75 placeholder:text-em-low outline-primary-500",
        ],
        className
      )}
      {...inputProps}
    />
    {!!error && (
      <CaptionText className="text-danger-500 font-bold">{error}</CaptionText>
    )}
  </Field>
);
