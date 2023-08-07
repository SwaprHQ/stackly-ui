"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

import { getOrderPairSymbols, totalOrdersDone } from "@/models/order";
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
} from "@/models/stack-order";
import { formatTokenValue } from "@/utils/token";
import { getDCAOrderContract } from "@stackly/sdk";
import { useEthersSigner } from "@/utils/ethers";
import { convertedAmount } from "@/utils/numbers";
import {
  StackedTokenLogoPair,
  DialogConfirmTransactionLoading,
  FromToStackTokenPair,
} from "@/components";
import { StackProgress } from "@/components/stack-modal/StackProgress";
import { StackOrdersTable } from "@/components/stack-modal/StackOrdersTable";

interface StackModalProps extends ModalBaseProps {
  stackOrder: StackOrder;
  refetchStacks: () => void;
}

export const txEplorerLink = (tx: string) => `https://gnosisscan.io/tx/${tx}`;

export const transactionExplorerLink = (address: string) =>
  `https://gnosisscan.io/address/${address}#tokentxns`;

interface CancellationTransaction {
  hash: string;
}

export const StackModal = ({
  stackOrder,
  isOpen,
  refetchStacks,
  closeAction,
}: StackModalProps) => {
  const signer = useEthersSigner();

  const [isOpenCancellationDialog, setIsOpenCancellationDialog] =
    useState(false);
  const [isCancellationProcessing, setIsCancellationProcessing] =
    useState(false);
  const [isCancellationSuccess, setIsCancellationSuccess] = useState(false);
  const [cancellationTx, setCancellationTx] =
    useState<CancellationTransaction>();

  const orderSlots = stackOrder.orderSlots;
  const firstSlot = orderSlots[0];
  const lastSlot = orderSlots[orderSlots.length - 1];
  const nextSlot = orderSlots[totalOrdersDone(stackOrder)];

  const remainingFunds =
    convertedAmount(stackOrder.amount, stackOrder.buyToken.decimals) -
    totalFundsUsed(stackOrder);

  const remainingFundsDescription =
    remainingFunds > 0 &&
    `remaining funds, ${remainingFunds} ${stackOrder.sellToken.symbol}`;

  const stackIsComplete =
    totalOrdersDone(stackOrder) === orderSlots.length && remainingFunds === 0;

  const cancelStack = async () => {
    if (!signer) return;

    try {
      setIsCancellationProcessing(true);
      const tx = await getDCAOrderContract(stackOrder.id, signer).cancel();
      setCancellationTx(tx);
      await tx.wait().then(() => {
        setIsCancellationProcessing(false);
        setIsCancellationSuccess(true);
      });
    } catch (e) {
      setIsCancellationProcessing(false);
      console.error("error", e);
    }
  };

  return (
    <div>
      <Modal
        maxWidth="2xl"
        isOpen={isOpen}
        closeAction={() => {
          if (
            !(
              isCancellationProcessing ||
              isOpenCancellationDialog ||
              isCancellationSuccess
            )
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
                href={transactionExplorerLink(stackOrder.id)}
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
              action="quaternary"
              iconLeft="close"
              size="icon"
              onClick={closeAction}
            />
          </div>
        </ModalHeader>
        <ModalContent className="px-0">
          <div className="grid grid-cols-2 gap-5 px-4 gap-x-8 md:grid-cols-4">
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
              {stackIsComplete
                ? "Complete"
                : formatTimestampToDateWithTime(nextSlot)}
            </StackDetail>
          </div>
          <div className="w-full my-4 border-b border-surface-50"></div>
          <div className="px-4">
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
        <ModalFooter>
          {!stackOrder.cancelledAt && !stackIsComplete && (
            <Button
              size="sm"
              action="secondary"
              onClick={() => setIsOpenCancellationDialog(true)}
              width="full"
            >
              Cancel Stacking
            </Button>
          )}
        </ModalFooter>
      </Modal>
      <Dialog
        isOpen={isOpenCancellationDialog}
        closeAction={() => setIsOpenCancellationDialog(false)}
      >
        <DialogContent
          title=" Are you sure you want to cancel stacking?"
          description={`The ${remainingFundsDescription}, will be sent to your wallet`}
        />
        <DialogFooterActions
          primaryAction={() => cancelStack()}
          primaryText="Proceed"
          secondaryAction={() => setIsOpenCancellationDialog(false)}
          secondaryText="Cancel"
        />
      </Dialog>
      <DialogConfirmTransactionLoading
        isOpen={isCancellationProcessing}
        title={cancellationTx && "Proceeding cancellation"}
        description={cancellationTx && "Waiting for transaction confirmation."}
      >
        {cancellationTx && cancellationTx.hash && (
          <CancelTransactionLink txHash={cancellationTx.hash} />
        )}
      </DialogConfirmTransactionLoading>
      <Dialog
        isOpen={isCancellationSuccess}
        closeAction={() => setIsCancellationSuccess(false)}
      >
        <Icon name="check" className="text-primary-400" size={38} />
        <DialogContent
          title="Stack Cancelled"
          description={`The ${remainingFundsDescription}, were sent to your wallet`}
        />
        {cancellationTx && cancellationTx.hash && (
          <CancelTransactionLink txHash={cancellationTx.hash} />
        )}
        <DialogFooterActions
          primaryAction={() => {
            refetchStacks();
            setIsCancellationSuccess(false);
            setIsCancellationProcessing(false);
            closeAction();
          }}
          primaryText="Back to Stacks"
        />
      </Dialog>
    </div>
  );
};

const CancelTransactionLink = ({ txHash }: { txHash: string }) => (
  <a
    className="capitalize text-primary-100"
    href={txEplorerLink(txHash)}
    target="blank"
  >
    check transaction
  </a>
);
const StackInfo = ({ stackOrder }: StackOrderProps) => (
  <div className="flex flex-col justify-between gap-2 px-4 py-3 mt-6 mb-4 md:items-center md:flex-row bg-surface-25 rounded-2xl">
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
      <span className="text-em-med">{getOrderPairSymbols(stackOrder)}</span>
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
