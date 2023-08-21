"use client";

import * as React from "react";

import { DayPicker } from "react-day-picker";

import { buttonStyles, Icon } from ".";
import { twMerge } from "tailwind-merge";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center relative items-center mx-4 py-3",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: twMerge(
          buttonStyles({ size: "icon", variant: "quaternary" }),
          "h-7 w-7 bg-transparent p-0 rounded-full border border-surface-50"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 mx-2",
        head_row: "flex",
        head_cell: "rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: twMerge(
          buttonStyles({ size: "icon", variant: "quaternary" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:enabled:bg-primary-400 focus:bg-primary-400 disabled:bg-transparent active:ring-primary-200 focus:ring-primary-200"
        ),
        day_selected: "bg-primary-400 text-primary-foreground ",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "opacity-50",
        day_disabled: "opacity-40",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <Icon name="caret-left" className="w-4 h-4" />
        ),
        IconRight: ({ ...props }) => (
          <Icon name="caret-right" className="w-4 h-4" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
