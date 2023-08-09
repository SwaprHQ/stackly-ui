"use client";

import { useRef, useState } from "react";
import { StackTransactionLoading } from "@/components/stackbox/StackTransactionLoading";
import {
  Modal,
  ModalFooter,
  Button,
  ModalContent,
  ModalHeaderTitle,
  BodyText,
  TitleText,
  ModalBaseProps,
} from "@/ui";
import { FromToStackTokenPair } from "@/components/FromToStackTokenPair";
import { Token } from "@/models/token";
import { format } from "date-fns";
import { FREQUENCY_OPTIONS } from "@/models/stack";

interface ConfirmStackModalProps extends ModalBaseProps {
  tokenFrom: Token;
  tokenTo: Token;
  amount: string;
  frequency: FREQUENCY_OPTIONS;
  startTime: Date;
  endTime: Date;
}

const frequencyTitles = {
  [FREQUENCY_OPTIONS.hour]: "hour",
  [FREQUENCY_OPTIONS.day]: "day",
  [FREQUENCY_OPTIONS.week]: "week",
  [FREQUENCY_OPTIONS.month]: "month",
};

const HOUR_IN_MILISECONDS = 60 * 60 * 1000;
const DAY_IN_MILISECONDS = 24 * HOUR_IN_MILISECONDS;

const frequencySeconds = {
  [FREQUENCY_OPTIONS.hour]: HOUR_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.day]: DAY_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.week]: 7 * DAY_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.month]: 30 * DAY_IN_MILISECONDS,
};

enum CREATE_STACK_STEPS {
  approve = "approve",
  create = "create",
}

const INITAL_ORDER = 1;

export const ConfirmStackModal = ({
  tokenFrom,
  tokenTo,
  amount,
  frequency,
  startTime,
  endTime,
  isOpen,
  closeAction,
}: ConfirmStackModalProps) => {
  const focusBtnRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState(CREATE_STACK_STEPS.approve);

  const [isTransactionLoadingDialogOpen, setTransactionLoadingDialogOpen] =
    useState(false);

  const createStack = () => {
    setTransactionLoadingDialogOpen(true);
  };

  const approveToken = () => {
    setStep(CREATE_STACK_STEPS.create);
  };

  const estimatedNumberOfOrders =
    Math.floor(
      (endTime.getTime() - startTime.getTime()) / frequencySeconds[frequency]
    ) + INITAL_ORDER;

  const amountPerOrder = (parseFloat(amount) / estimatedNumberOfOrders).toFixed(
    2
  );

  return (
    <Modal
      isOpen={isOpen}
      closeAction={closeAction}
      initialFocusRef={focusBtnRef}
    >
      <ModalHeaderTitle closeAction={closeAction} title="Confirm Stack" />
      <ModalContent>
        <div className="space-y-6">
          <div className="flex items-center px-4 py-2 mx-auto space-x-4 bg-surface-25 rounded-3xl w-fit">
            <FromToStackTokenPair
              fromToken={tokenFrom}
              fromText={tokenFrom.symbol}
              toToken={tokenTo}
              toText={tokenTo.symbol}
            />
          </div>
          <div>
            <TitleText size={2} className="text-center text-em-low">
              Stacks{" "}
              <span className="text-em-high">
                {amountPerOrder} {tokenFrom.symbol}
              </span>{" "}
              worth of <span className="text-em-high">{tokenTo.symbol}</span>{" "}
              every {frequencyTitles[frequency]}
            </TitleText>
          </div>
          <div className="w-full p-5 space-y-2 bg-surface-25 rounded-xl">
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Starts on</BodyText>
              <BodyText>{format(startTime, "dd MMM yy, HH:mm")}</BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Ends on</BodyText>
              <BodyText>{format(endTime, "dd MMM yy, HH:mm")}</BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">
                Total funds to be used
              </BodyText>
              <BodyText className="text-end">
                {amount} {tokenFrom.symbol}
              </BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Stack fee</BodyText>
              <BodyText>0.25%</BodyText>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        {step === CREATE_STACK_STEPS.create && (
          <Button action="tertiary" onClick={closeAction} width="full">
            Cancel
          </Button>
        )}
        {step === CREATE_STACK_STEPS.approve && (
          <Button
            action="primary"
            onClick={approveToken}
            width="full"
            ref={focusBtnRef}
            className="whitespace-nowrap"
          >
            Approve {tokenFrom.symbol}
          </Button>
        )}
        <Button
          action="primary"
          onClick={createStack}
          width="full"
          ref={focusBtnRef}
          disabled={step === CREATE_STACK_STEPS.approve}
        >
          Stack now
        </Button>
      </ModalFooter>
      <StackTransactionLoading
        isOpen={isTransactionLoadingDialogOpen}
        closeAction={() => setTransactionLoadingDialogOpen(false)}
      />
    </Modal>
  );
};
