"use client";

import { format, isToday, isTomorrow } from "date-fns";

import { Button, Calendar, Icon } from "@/ui";
import { Popover } from "@headlessui/react";

import { Dispatch, Ref, SetStateAction, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { twMerge } from "tailwind-merge";

interface DatePickerProps {
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
}: DatePickerProps) {
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

    return format(dateTime, "dd MMM Y 'at' HH:mm");
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
            )}
          >
            <span>{formattedDate()}</span>
            <Icon name="caret-down" className="w-4 h-4 mr-2 text-black" />
          </Popover.Button>
          {open && (
            <>
              <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
              <Popover.Panel
                ref={setPopperElement as Ref<HTMLDivElement>}
                style={styles.popper}
                {...attributes.popper}
                className="w-fit h-fit m-auto max-md:!fixed max-md:!inset-0 max-md:!flex max-md:!items-center max-md:!justify-center max-md:!transform" /* This styles will make it hover on mobile */
              >
                {({ close }) => (
                  <div className="flex flex-col space-y-2 bg-white border divide-y divide-surface-50 rounded-2xl border-surface-50">
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
                    <div className="flex flex-col p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>{timeCaption}</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center px-3 py-2 border border-surface-75 rounded-xl text-em-low">
                            <input
                              className="flex-grow w-5 text-sm font-semibold text-center outline-none"
                              type="number"
                              pattern="[0-9]*"
                              value={hours}
                              onKeyDown={(evt) =>
                                ["e", "E", "+", "-"].includes(evt.key) &&
                                evt.preventDefault()
                              }
                              onChange={(event) => {
                                const hours = event.target.value;
                                const hoursNumber = Number(hours);
                                if (
                                  hoursNumber >= 0 &&
                                  hoursNumber < 24 &&
                                  hours.length < 3
                                ) {
                                  setHours(hours);
                                }
                              }}
                            />
                          </div>
                          <span>:</span>
                          <div className="flex items-center px-3 py-2 border border-surface-75 rounded-xl text-em-low">
                            <input
                              className="flex-grow w-5 text-sm font-semibold text-center outline-none"
                              type="number"
                              pattern="[0-9]*"
                              value={minutes}
                              onKeyDown={(evt) =>
                                ["e", "E", "+", "-"].includes(evt.key) &&
                                evt.preventDefault()
                              }
                              onChange={(event) => {
                                const minutes = event.target.value;
                                const minutesNumber = Number(minutes);
                                if (
                                  minutesNumber >= 0 &&
                                  minutesNumber < 60 &&
                                  minutes.length < 3
                                ) {
                                  setMinutes(minutes);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="primary"
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
