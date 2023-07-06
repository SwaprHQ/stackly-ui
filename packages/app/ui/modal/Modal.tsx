"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, RefObject } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export interface ModalBaseProps {
  isOpen: boolean;
  closeAction: () => void;
}
interface ModalProps extends ModalBaseProps {
  children: ReactNode;
  maxWidth?: "2xl" | "xl" | "lg" | "md" | "sm";
  initialFocusRef?: RefObject<HTMLButtonElement | HTMLInputElement>;
}

export const dialogPanelStyles = cva(
  [
    "w-full",
    "overflow-hidden text-left align-middle",
    "bg-white shadow-xl rounded-2xl",
    "transition-all transform "
  ],
  {
    variants: {
      maxWidth: {
        "2xl": "max-w-2xl",
        xl: "max-w-xl",
        lg: "max-w-lg",
        md: "max-w-md",
        sm: "max-w-sm"
      }
    },
    defaultVariants: {
      maxWidth: "md"
    }
  }
);

export function Modal({
  isOpen,
  closeAction,
  maxWidth,
  children,
  initialFocusRef
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 shadow-xl"
        onClose={closeAction}
        initialFocus={initialFocusRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={dialogPanelStyles({ maxWidth })}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
