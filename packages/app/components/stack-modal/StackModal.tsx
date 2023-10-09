"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { cx } from "class-variance-authority";

import { orderPairSymbolsText, totalOrderSlotsDone } from "@/models/order";
import {
  Modal,
  ModalFooter,
  Icon,
  Button,
  ModalContent,
  BodyText,
  ModalHeader,
  TitleText,
  ModalBaseProps,
  DialogContent,
  DialogFooterActions,
  Dialog,
} from "@/ui";
import {
  formatFrequencyHours,
  formatTimestampToDateWithTime,
} from "@/utils/datetime";
import {
  StackOrder,
  StackOrderProps,
  calculateStackAveragePrice,
  totalStackOrdersDone,
  totalStacked,
  totalFundsUsed,
  stackIsFinishedWithFunds,
  stackIsComplete,
  stackRemainingFunds,
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";
import { getDCAOrderContract } from "@stackly/sdk";
import { useEthersSigner } from "@/utils/ethers";
import {
  StackedTokenLogoPair,
  DialogConfirmTransactionLoading,
  FromToStackTokenPair,
} from "@/components";
import { StackProgress } from "@/components/stack-modal/StackProgress";
import { StackOrdersTable } from "@/components/stack-modal/StackOrdersTable";
import { ModalId, useModalContext } from "@/contexts";
import { TransactionLink } from "./TransactionLink";
import { Transaction } from "@/models/stack";
import { useNetwork } from "wagmi";

interface StackModalProps extends ModalBaseProps {
  stackOrder: StackOrder;
  refetchStacks: () => void;
}

type Content = {
  title: string;
  description: string;
  button: {
    action: "primary" | "secondary";
    text: string;
  };
};

const addressExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}#tokentxns`;

export const StackModal = ({
  stackOrder,
  isOpen,
  refetchStacks,
  closeAction,
}: StackModalProps) => {
  const signer = useEthersSigner();
  const { chain } = useNetwork();
  const { closeModal, isModalOpen, openModal } = useModalContext();

  const [cancellationTx, setCancellationTx] = useState<Transaction>();

  const orderSlots = stackOrder.orderSlots;
  const firstSlot = orderSlots[0];
  const lastSlot = orderSlots[orderSlots.length - 1];
  const nextSlot = orderSlots[totalOrderSlotsDone(stackOrder)];

  const stackRemainingFundsWithTokenText = `${stackRemainingFunds(
    stackOrder
  )} ${stackOrder.sellToken.symbol}`;

  const remainingFundsText = `The ${stackRemainingFundsWithTokenText} will be sent to your wallet.`;

  const getConfirmCancelContent = (): Content => {
    if (stackIsFinishedWithFunds(stackOrder))
      return {
        title: "Proceed with cancelation to withdraw funds",
        description: remainingFundsText,
        button: {
          action: "primary",
          text: `Withdraw ${stackRemainingFundsWithTokenText}`,
        },
      };

    return {
      title: "Are you sure you want to cancel stacking?",
      description: remainingFundsText,
      button: {
        action: "secondary",
        text: "Cancel Stack",
      },
    };
  };

  const cancelStack = async () => {
    if (!signer) return;

    try {
      openModal(ModalId.CANCEL_STACK_PROCESSING);
      const tx = await getDCAOrderContract(stackOrder.id, signer).cancel();
      setCancellationTx(tx);
      await tx.wait();
      closeModal(ModalId.CANCEL_STACK_PROCESSING);
      openModal(ModalId.CANCEL_STACK_SUCCESS);
    } catch (e) {
      closeModal(ModalId.CANCEL_STACK_PROCESSING);
      console.error("Cancel stack error", e);
    }
  };

  const stackNotCancelledAndNotComplete =
    !stackOrder.cancelledAt && !stackIsComplete(stackOrder);

  return (
    <>
      <Modal
        maxWidth="2xl"
        isOpen={isOpen}
        closeAction={() => {
          if (
            !isModalOpen(ModalId.CANCEL_STACK_CONFIRM) &&
            !isModalOpen(ModalId.CANCEL_STACK_PROCESSING) &&
            !isModalOpen(ModalId.CANCEL_STACK_SUCCESS)
          )
            closeAction();
        }}
      >
        <ModalHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <StackedTokenLogoPair order={stackOrder} />
              <Link
                passHref
                target="_blank"
                href={addressExplorerLink(stackOrder.id)}
                className="flex items-center space-x-0.5 hover:border-em-low border-b-2 border-em-disabled group"
              >
                <BodyText className="text-em-med">
                  {stackOrder.id.substring(0, 7)}
                </BodyText>
                <Icon
                  className="text-em-med group-hover:animate-bounce"
                  name="arrow-external"
                  size={16}
                />
              </Link>
            </div>
            <Button
              variant="quaternary"
              iconLeft="close"
              size="icon"
              onClick={closeAction}
            />
          </div>
        </ModalHeader>
        <ModalContent className="px-0 space-y-4 md:px-0">
          <div className="grid grid-cols-2 gap-5 px-4 md:px-6 gap-x-8 md:grid-cols-4">
            <StackDetail title="Starts on">
              {formatTimestampToDateWithTime(firstSlot)}
            </StackDetail>
            <StackDetail title="Ends on">
              {formatTimestampToDateWithTime(lastSlot)}
            </StackDetail>
            <StackDetail title="Frequency">
              Every {formatFrequencyHours(Number(stackOrder.interval))}
            </StackDetail>
            <StackDetail title="Next order">
              {stackIsComplete(stackOrder)
                ? "Complete"
                : stackIsFinishedWithFunds(stackOrder)
                ? "Finished with funds"
                : stackOrder.cancelledAt
                ? "Cancelled"
                : formatTimestampToDateWithTime(nextSlot)}
            </StackDetail>
          </div>
          <div className="w-full my-4 border-b border-surface-50"></div>
          {stackIsFinishedWithFunds(stackOrder) && (
            <div className="px-4 md:px-6">
              <HasRemainingFundsAlertMessage
                remainingFundsWithSymbol={stackRemainingFundsWithTokenText}
              />
            </div>
          )}
          <div className="px-4 space-y-4 md:px-6">
            <TitleText size={2} weight="bold">
              Orders
            </TitleText>
            <StackProgress stackOrder={stackOrder} />
            <StackInfo stackOrder={stackOrder} />
            {totalStackOrdersDone(stackOrder) > 0 && (
              <StackOrdersTable stackOrder={stackOrder} />
            )}
          </div>
        </ModalContent>
        <ModalFooter
          className={cx({
            "pt-0 pb-6": !stackNotCancelledAndNotComplete,
          })}
        >
          {stackNotCancelledAndNotComplete && (
            <Button
              variant={getConfirmCancelContent().button.action}
              onClick={() => openModal(ModalId.CANCEL_STACK_CONFIRM)}
              width="full"
            >
              {getConfirmCancelContent().button.text}
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <Dialog
        isOpen={isModalOpen(ModalId.CANCEL_STACK_CONFIRM)}
        closeAction={() => closeModal(ModalId.CANCEL_STACK_CONFIRM)}
      >
        <DialogContent
          title={getConfirmCancelContent().title}
          description={getConfirmCancelContent().description}
        />
        <DialogFooterActions
          primaryAction={() => cancelStack()}
          primaryText="Proceed"
          secondaryAction={() => closeModal(ModalId.CANCEL_STACK_CONFIRM)}
          secondaryText="Cancel"
        />
      </Dialog>
      <DialogConfirmTransactionLoading
        closeAction={() => closeModal(ModalId.CANCEL_STACK_PROCESSING)}
        isOpen={isModalOpen(ModalId.CANCEL_STACK_PROCESSING)}
        title={cancellationTx && "Proceeding cancellation"}
        description={cancellationTx && "Waiting for transaction confirmation."}
      >
        {cancellationTx?.hash && chain?.id && (
          <TransactionLink chainId={chain.id} hash={cancellationTx.hash} />
        )}
      </DialogConfirmTransactionLoading>
      <Dialog
        isOpen={isModalOpen(ModalId.CANCEL_STACK_SUCCESS)}
        closeAction={() => closeModal(ModalId.CANCEL_STACK_SUCCESS)}
      >
        <Icon name="check" className="text-primary-400" size={38} />
        <DialogContent
          title="Stack Cancelled"
          description={`The ${stackRemainingFundsWithTokenText} were sent to your wallet.`}
        />
        {cancellationTx?.hash && chain?.id && (
          <TransactionLink chainId={chain.id} hash={cancellationTx.hash} />
        )}
        <DialogFooterActions
          primaryAction={() => {
            refetchStacks();
            closeModal(ModalId.CANCEL_STACK_PROCESSING);
            closeModal(ModalId.CANCEL_STACK_SUCCESS);
            closeAction();
          }}
          primaryText="Back to Stacks"
        />
      </Dialog>
    </>
  );
};

const StackInfo = ({ stackOrder }: StackOrderProps) => (
  <div className="flex flex-col justify-between gap-2 px-4 py-3 md:px-6 md:items-center md:flex-row bg-surface-25 rounded-2xl">
    <FromToStackTokenPair
      fromToken={stackOrder.sellToken}
      fromText={formatTokenValue(totalFundsUsed(stackOrder))}
      toToken={stackOrder.buyToken}
      toText={formatTokenValue(totalStacked(stackOrder))}
    />
    <BodyText size="responsive" className="space-x-1">
      <span className="text-em-low">Avg buy price:</span>
      <span className="text-em-med">
        {formatTokenValue(calculateStackAveragePrice(stackOrder))}
      </span>
      <span className="text-em-med">{orderPairSymbolsText(stackOrder)}</span>
    </BodyText>
  </div>
);

const HasRemainingFundsAlertMessage = ({
  remainingFundsWithSymbol,
}: {
  remainingFundsWithSymbol: string;
}) => (
  <div className="p-3 text-center rounded-lg bg-danger-75">
    <BodyText className="text-em-med">
      This contract has {remainingFundsWithSymbol} remaining funds.
    </BodyText>
  </div>
);

const StackDetail = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="space-y-1">
    <BodyText size={1} className="text-em-low">
      {title}
    </BodyText>
    <BodyText size={1}>{children}</BodyText>
  </div>
);
