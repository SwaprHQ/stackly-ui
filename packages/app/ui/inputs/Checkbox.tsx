import { Checkbox as BaseCheckbox, Field, Label } from "@headlessui/react";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

import { Icon } from "../icon/Icon";
import { BodyText } from "../text";

interface CheckboxProps {
  checked: boolean;
  className?: string;
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox = ({
  checked,
  className,
  id,
  label,
  onChange,
}: CheckboxProps) => {
  return (
    <Field className="flex items-center gap-2">
      <BaseCheckbox
        checked={checked}
        className={twMerge(
          [
            "appearance-none border-2 border-em-low h-4 w-4 rounded-md cursor-pointer",
            "data-[checked]:bg-primary-800 data-[checked]:border-none",
          ],
          className
        )}
        id={id}
        onChange={onChange}
      >
        <Icon
          className={cx("text-primary-800", {
            block: checked,
            hidden: !checked,
          })}
          name="checkbox"
          size={16}
        />
      </BaseCheckbox>
      <Label htmlFor={id}>
        <BodyText className="text-em-low cursor-pointer">{label}</BodyText>
      </Label>
    </Field>
  );
};
