"use client";

import { useRef, useState } from "react";
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
import {
  FromToStackTokenPair,
  DialogConfirmTransactionLoading,
} from "@/components";

export const ConfirmStackModal = ({ isOpen, closeAction }: ModalBaseProps) => {
  const focusBtnRef = useRef<HTMLButtonElement>(null);
  const [isTransactionLoadingDialogOpen, setTransactionLoadingDialogOpen] =
    useState(false);

  function stack() {
    setTransactionLoadingDialogOpen(true);
  }

  const fromToken = {
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    symbol: "USDC",
    decimals: 18,
    name: "usdc",
  };

  const toToken = {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    symbol: "WETH",
    decimals: 18,
    name: "wrapped eth",
  };

  return (
    <Modal
      isOpen={isOpen}
      closeAction={closeAction}
      initialFocusRef={focusBtnRef}
    >
      <ModalHeaderTitle title="Confirm Stack" closeAction={closeAction} />
      <ModalContent>
        <div className="space-y-6">
          <div className="flex items-center px-4 py-2 mx-auto space-x-4 bg-surface-25 rounded-3xl w-fit">
            <FromToStackTokenPair
              fromToken={fromToken}
              fromText={fromToken.symbol}
              toToken={toToken}
              toText={toToken.symbol}
            />
          </div>
          <div>
            <TitleText size={2} className="text-center text-em-low">
              Stacks <span className="text-em-high">62.5 USDC</span> worth of{" "}
              <span className="text-em-high">WETH</span> every hour
            </TitleText>
          </div>
          <div className="w-full p-5 space-y-2 bg-surface-25 rounded-xl">
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Starts on</BodyText>
              <BodyText>1 Jun 23, 2:00 PM</BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Ends on</BodyText>
              <BodyText>30 Jun 23, 2:00 PM</BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">
                Total funds to be used
              </BodyText>
              <BodyText>1000 USDC</BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Stack fee</BodyText>
              <BodyText>0.05%</BodyText>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button action="tertiary" onClick={closeAction} width="full">
          Cancel
        </Button>
        <Button action="primary" onClick={stack} width="full" ref={focusBtnRef}>
          Stack now
        </Button>
      </ModalFooter>
      <DialogConfirmTransactionLoading
        isOpen={isTransactionLoadingDialogOpen}
        closeAction={() => setTransactionLoadingDialogOpen(false)}
      />
    </Modal>
  );
};
