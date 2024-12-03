import { Input, InputProps, Field, Label } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { BodyText, CaptionText } from "../text";

interface TextInputProps extends InputProps {
  className?: string;
  error?: string;
  id: string;
  label?: string;
}

export const TextInput = ({
  className,
  error,
  id,
  label,
  ...inputProps
}: TextInputProps) => (
  <Field className="flex flex-col gap-2">
    {label && (
      <Label htmlFor={id}>
        <BodyText className="text-em-low">{label}</BodyText>
      </Label>
    )}
    <Input
      id={id}
      className={twMerge(
        [
          "border border-surface-75 outline-primary-500",
          "placeholder:text-sm placeholder:text-em-low ",
          "w-full min-h-10 rounded-3xl px-3 py-2",
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
