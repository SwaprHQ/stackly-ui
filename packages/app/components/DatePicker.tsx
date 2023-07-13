"use client";

import { format, isToday, isTomorrow } from "date-fns";

import { Button, Calendar, Icon } from "@/ui";
import { Popover } from "@headlessui/react";

import { Dispatch, Ref, SetStateAction, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { twMerge } from "tailwind-merge";

interface IDatePicker {
  dateTime: Date;
  setDateTime: Dispatch<SetStateAction<Date>>;
  className?: string;
  timeCaption: string;
  fromDate?: Date;
}

export function DatePicker({
  dateTime,
  setDateTime,
  className,
  timeCaption,
  fromDate,
}: IDatePicker) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(dateTime));
  const [hours, setHours] = useState(format(currentDate, "HH"));
  const [minutes, setMinutes] = useState(format(currentDate, "mm"));

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
    if (isToday(dateTime)) return format(dateTime, "'Today at' HH:mm");
    if (isTomorrow(dateTime)) return format(dateTime, "'Tomorrow at' HH:mm");

    return format(dateTime, "dd MMM Y @ HH:mm");
  };

  useEffect(() => {
    const newDate = new Date(dateTime);
    setCurrentDate(newDate);
    setHours(format(newDate, "HH"));
    setMinutes(format(newDate, "mm"));
  }, [dateTime]);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement as Ref<HTMLButtonElement>}
            className={twMerge(
              "flex justify-between items-center focus:border-0",
              className
            )} // text-em-low if default dates
          >
            <span>{formattedDate()}</span>
            <Icon name="caret-down" className="mr-2 h-4 w-4 text-black" />
          </Popover.Button>
          {open && (
            <>
              <div
                className="max-md:fixed max-md:inset-0 max-md:bg-black/30"
                aria-hidden="true"
              />
              <Popover.Panel
                ref={setPopperElement as Ref<HTMLDivElement>}
                style={styles.popper}
                {...attributes.popper}
                className="w-fit h-fit m-auto max-md:!fixed max-md:!inset-0 max-md:!flex max-md:!items-center max-md:!justify-center max-md:!transform" /* This styles will make it hover on mobile */
              >
                {({ close }) => (
                  <div className="flex flex-col space-y-2 bg-white divide-y divide-surface-50 rounded-2xl border border-surface-50">
                    <Calendar
                      mode="single"
                      selected={currentDate}
                      defaultMonth={currentDate}
                      onSelect={(newDate: Date | undefined) => {
                        if (!newDate) return;
                        newDate.setHours(currentDate.getHours());
                        newDate.setMinutes(currentDate.getMinutes());
                        setCurrentDate(newDate);
                      }}
                      initialFocus
                      className=""
                      fromDate={fromDate || new Date()}
                    />
                    <div className="flex flex-col space-y-2 p-4 pt-2">
                      <div className="flex justify-between items-center">
                        <span>{timeCaption}</span>
                        <div className="flex space-x-2  items-center">
                          <div className="flex items-center border border-surface-75 rounded-xl py-2 px-3 text-em-low">
                            <input
                              className="outline-none font-semibold flex-grow text-sm w-5 text-center"
                              type="number"
                              pattern="[0-9]*"
                              value={hours}
                              onKeyDown={(evt) =>
                                ["e", "E", "+", "-"].includes(evt.key) &&
                                evt.preventDefault()
                              }
                              onChange={(event) => {
                                const value = event.target.value;
                                const numberValue = Number(value);
                                if (
                                  numberValue >= 0 &&
                                  numberValue < 24 &&
                                  value.length < 3
                                ) {
                                  setHours(value);
                                }
                              }}
                            />
                          </div>
                          <span>:</span>
                          <div className="flex items-center border border-surface-75 rounded-xl py-2 px-3 text-em-low">
                            <input
                              className="outline-none font-semibold flex-grow text-sm w-5 text-center"
                              type="number"
                              pattern="[0-9]*"
                              value={minutes}
                              onKeyDown={(evt) =>
                                ["e", "E", "+", "-"].includes(evt.key) &&
                                evt.preventDefault()
                              }
                              onChange={(event) => {
                                const value = event.target.value;
                                const numberValue = Number(value);
                                if (
                                  numberValue >= 0 &&
                                  numberValue < 60 &&
                                  value.length < 3
                                ) {
                                  setMinutes(event.target.value);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        action="secondary"
                        onClick={() => {
                          const newDate = new Date(currentDate);
                          newDate.setHours(Number(hours));
                          newDate.setMinutes(Number(minutes));
                          setDateTime(newDate);
                          close();
                        }}
                      >
                        Set Date and Time
                      </Button>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </>
          )}
        </>
      )}
    </Popover>
  );
}
