"use client";

import { useEffect, ReactNode } from "react";
import { cva, cx } from "class-variance-authority";

import { Button, Icon, Modal, ModalBaseProps, TitleText } from "@/ui";

export enum ToastPosition {
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
}

export enum Severity {
  ERROR = "warning",
  SUCCESS = "check",
}

interface ToastProps extends ModalBaseProps {
  autoClose?: boolean;
  autoCloseTime?: number;
  children: ReactNode;
  position?: ToastPosition;
  severity?: Severity;
  title: string;
}

export const Toast = ({
  autoClose,
  autoCloseTime = 3000,
  children,
  closeAction,
  isOpen,
  position,
  severity,
  title,
}: ToastProps) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoClose && autoCloseTime && isOpen) {
        closeAction();
      }
    }, autoCloseTime);

    return () => {
      clearInterval(interval);
    };
  }, [autoClose, autoCloseTime, closeAction, isOpen]);

  const hasSeverity = Boolean(severity);

  return (
    <Modal
      className={toastStyles({ position })}
      closeAction={closeAction}
      isOpen={isOpen}
      withOpacity={false}
    >
      <div className="flex items-center justify-between">
        {severity ? (
          <div className="flex">
            <Icon
              className={cx({
                "text-danger-500": severity === Severity.ERROR,
                "text-primary-700": severity === Severity.SUCCESS,
              })}
              size={24}
              name={severity}
            />
            <ToastTitle hasSeverity={hasSeverity} title={title} />
          </div>
        ) : (
          <ToastTitle hasSeverity={hasSeverity} title={title} />
        )}

        <Button
          variant="quaternary"
          className="ml-3"
          iconLeft="close"
          onClick={closeAction}
          size="icon"
        />
      </div>
      <div
        className={cx("mt-2 w-fit", {
          "ml-9": hasSeverity,
        })}
      >
        {children}
      </div>
    </Modal>
  );
};

export const toastStyles = cva("py-6 pl-6 pr-4 !w-fit fixed", {
  variants: {
    position: {
      [ToastPosition.BOTTOM_LEFT]: "bottom-4 left-4",
      [ToastPosition.BOTTOM_RIGHT]: "bottom-4 right-4",
      [ToastPosition.TOP_LEFT]: "top-4 left-4",
      [ToastPosition.TOP_RIGHT]: "top-4 right-4",
    },
  },
  defaultVariants: {
    position: ToastPosition.TOP_RIGHT,
  },
});

interface ToastTitleProps {
  hasSeverity: boolean;
  title: string;
}

const ToastTitle = ({ hasSeverity, title }: ToastTitleProps) => (
  <TitleText
    className={cx({
      "ml-3": hasSeverity,
    })}
    size={2}
  >
    {title}
  </TitleText>
);
