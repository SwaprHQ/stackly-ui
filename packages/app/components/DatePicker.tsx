"use client";

import { format, isToday, isTomorrow } from "date-fns";

import { Button, Calendar, Icon } from "@/ui";
import { Dialog, Popover } from "@headlessui/react";

import { Dispatch, Ref, SetStateAction, useState } from "react";
import { usePopper } from "react-popper";
import { twMerge } from "tailwind-merge";

interface IDatePicker {
  dateTime: Date;
  setDateTime: Dispatch<SetStateAction<Date>>;
  className?: string;
  timeCaption: string;
}

export function DatePicker({
  dateTime,
  setDateTime,
  className,
  timeCaption,
}: IDatePicker) {
  const [currentDate, setCurrentDate] = useState<Date>(dateTime);
  const [referenceElement, setReferenceElement] = useState<
    HTMLButtonElement | undefined
  >();
  const [popperElement, setPopperElement] = useState<
    HTMLDivElement | undefined
  >();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const formattedDate = () => {
    if (!dateTime) return "Pick a date";
    if (isToday(dateTime)) return format(dateTime, "'Today at' HH:mm");
    if (isTomorrow(dateTime)) return format(dateTime, "'Tomorrow at' HH:mm");

    return format(dateTime, "dd MMM Y @ HH:mm");
  };

  return (
    <Popover>
      <Popover.Button
        ref={setReferenceElement as Ref<HTMLButtonElement>}
        className={twMerge("flex justify-between items-center", className)} // text-em-low if default dates
      >
        <span>{formattedDate()}</span>
        <Icon name="caret-down" className="mr-2 h-4 w-4 text-black" />
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement as Ref<HTMLDivElement>}
        style={styles.popper}
        {...attributes.popper}
        className="w-fit mx-auto max-md:!fixed max-md:!inset-0 max-md:!flex max-md:!items-center max-md:!justify-center max-md:!p-4 max-md:!transform" /* This styles will make it hover on mobile */
      >
        {({ close }) => (
          <div className="flex flex-col space-y-2 bg-white divide-y divide-surface-50 rounded-2xl border border-surface-50">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(newDate: Date | undefined) => {
                if (!newDate) return;
                if (currentDate) {
                  newDate.setHours(currentDate.getHours());
                  newDate.setMinutes(currentDate.getMinutes());
                }
                setCurrentDate(newDate);
              }}
              initialFocus
              className=""
              fromDate={new Date()}
            />
            <div className="flex flex-col space-y-2 p-4 pt-2">
              <div className="flex justify-between items-center">
                <span>{timeCaption}</span>
                <div className="flex space-x-2  items-center">
                  <div className="flex items-center border border-surface-75 rounded-xl py-2 px-3 text-em-low">
                    <input
                      className="outline-none font-semibold flex-grow text-sm w-5 text-center"
                      type="number"
                      value={currentDate ? format(currentDate, "HH") : ""}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (value >= 0 && value < 24) {
                          const newDate = new Date(currentDate);
                          newDate.setHours(value);
                          setCurrentDate(newDate);
                        }
                      }}
                    />
                  </div>
                  <span>:</span>
                  <div className="flex items-center border border-surface-75 rounded-xl py-2 px-3 text-em-low">
                    <input
                      className="outline-none font-semibold flex-grow text-sm w-5 text-center"
                      type="number"
                      value={currentDate ? format(currentDate, "mm") : ""}
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        if (value >= 0 && value < 60) {
                          const newDate = new Date(currentDate);
                          newDate.setMinutes(value);
                          setCurrentDate(newDate);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <Button
                action="secondary"
                onClick={() => {
                  setDateTime(currentDate);
                  close();
                }}
              >
                Set Date and Time
              </Button>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}
