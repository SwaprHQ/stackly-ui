"use client";

import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { parseUnits } from "viem";
import { trackEvent } from "fathom-client";
import { useAccount } from "wagmi";

import {
  ChainId,
  createDCAOrderWithNonce,
  getERC20Contract,
  getOrderFactory,
  getOrderFactoryAddress,
} from "@stackly/sdk";
import { dateToUnixTimestamp, useEthersSigner } from "@/utils";
import {
  DialogConfirmTransactionLoading,
  FromToStackTokenPair,
  TransactionLink,
} from "@/components";
import { EVENTS } from "@/analytics";
import {
  FREQUENCY_OPTIONS,
  INITAL_ORDER,
  Token,
  Transaction,
  frequencySeconds,
} from "@/models";
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
import { ModalId, useModalContext, useNetworkContext } from "@/contexts";

interface ConfirmStackModalProps extends ModalBaseProps {
  fromToken: Token;
  toToken: Token;
  amount: string;
  frequency: FREQUENCY_OPTIONS;
  startTime: Date;
  endTime: Date;
  onSuccess: () => void;
}

const frequencyIntervalInHours = {
  [FREQUENCY_OPTIONS.hour]: 1,
  [FREQUENCY_OPTIONS.day]: 24,
  [FREQUENCY_OPTIONS.week]: 24 * 7,
  [FREQUENCY_OPTIONS.month]: 24 * 30,
};

enum CREATE_STACK_STEPS {
  approve = "approve",
  create = "create",
}

export const ConfirmStackModal = ({
  fromToken,
  toToken,
  amount,
  frequency,
  startTime,
  endTime,
  isOpen,
  closeAction,
  onSuccess,
}: ConfirmStackModalProps) => {
  const { address } = useAccount();
  const { chainId } = useNetworkContext();
  const signer = useEthersSigner({ chainId });
  const { closeModal, isModalOpen, openModal } = useModalContext();

  const focusBtnRef = useRef<HTMLButtonElement>(null);

  const [step, setStep] = useState(CREATE_STACK_STEPS.approve);
  const [allowance, setAllowance] = useState<string>();

  const [approveTx, setApproveTx] = useState<Transaction>();
  const [stackCreationTx, setStackCreationTx] = useState<Transaction>();

  const rawAmount = parseUnits(amount, fromToken.decimals);
  const estimatedNumberOfOrders =
    Math.floor(
      (endTime.getTime() - startTime.getTime()) / frequencySeconds[frequency]
    ) + INITAL_ORDER;

  const amountPerOrder = (parseFloat(amount) / estimatedNumberOfOrders).toFixed(
    2
  );

  useEffect(() => {
    if (allowance && BigInt(allowance) >= rawAmount)
      setStep(CREATE_STACK_STEPS.create);
  }, [allowance, rawAmount]);

  useEffect(() => {
    (async () => {
      const signerInstance = await signer;
      if (!signerInstance || !address) return;

      try {
        const factoryAddress = getOrderFactoryAddress(chainId as ChainId);
        getERC20Contract(fromToken.address, signerInstance)
          .allowance(address, factoryAddress)
          .then((value) => setAllowance(value.toString()));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [signer, address, fromToken.address, chainId]);

  const approveFromToken = async () => {
    const signerInstance = await signer;
    if (!signerInstance || !address || !chainId) return;

    const sellTokenContract = getERC20Contract(
      fromToken.address,
      signerInstance
    );

    try {
      openModal(ModalId.STACK_APPROVE_PROCESSING);
      const approveFactoryTransaction = await sellTokenContract.approve(
        getOrderFactoryAddress(chainId),
        rawAmount
      );
      setApproveTx(approveFactoryTransaction);

      await approveFactoryTransaction.wait();

      setStep(CREATE_STACK_STEPS.create);
      closeModal(ModalId.STACK_APPROVE_PROCESSING);
    } catch (e) {
      closeModal(ModalId.STACK_APPROVE_PROCESSING);
      console.error(e);
    }
  };

  const createStack = async () => {
    const signerInstance = await signer;
    if (!signerInstance || !address || !chainId) return;

    const initParams: Parameters<typeof createDCAOrderWithNonce>[1] = {
      nonce: dateToUnixTimestamp(new Date()),
      owner: address as string,
      receiver: address as string,
      sellToken: fromToken.address,
      buyToken: toToken.address,
      amount: rawAmount.toString(),
      startTime: dateToUnixTimestamp(startTime),
      endTime: dateToUnixTimestamp(endTime),
      interval: frequencyIntervalInHours[frequency],
    };

    const orderFactory = getOrderFactory(
      getOrderFactoryAddress(chainId),
      signerInstance
    );

    try {
      openModal(ModalId.STACK_CREATION_PROCESSING);

      const createOrderTransaction = await createDCAOrderWithNonce(
        orderFactory,
        initParams
      );
      setStackCreationTx(createOrderTransaction);

      await createOrderTransaction.wait();
      closeModal(ModalId.STACK_CREATION_PROCESSING);
      onSuccess();
    } catch (e) {
      closeModal(ModalId.STACK_CREATION_PROCESSING);
      console.error(e);
    }
  };

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
              fromToken={fromToken}
              fromText={fromToken.symbol}
              toToken={toToken}
              toText={toToken.symbol}
            />
          </div>
          <div>
            <TitleText size={2} className="text-center text-em-low">
              Stacks <span className="text-em-high">{toToken.symbol}</span>,
              swapping{" "}
              <span className="text-em-high">
                {amountPerOrder} {fromToken.symbol}
              </span>
              <br />
              <span className="text-em-high">
                every {FREQUENCY_OPTIONS[frequency]}
              </span>
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
              <BodyText className="text-em-med">Total funds</BodyText>
              <BodyText className="text-end">
                {amount} {fromToken.symbol}
              </BodyText>
            </div>
            <div className="flex items-center justify-between">
              <BodyText className="text-em-med">Fee</BodyText>
              <BodyText>0.25%</BodyText>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        {step === CREATE_STACK_STEPS.create && (
          <Button
            size="lg"
            variant="tertiary"
            onClick={closeAction}
            width="full"
          >
            Cancel
          </Button>
        )}
        {step === CREATE_STACK_STEPS.approve && (
          <Button
            size="lg"
            variant="primary"
            onClick={approveFromToken}
            width="full"
            ref={focusBtnRef}
            className="whitespace-nowrap"
          >
            Approve {fromToken.symbol}
          </Button>
        )}
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            trackEvent(EVENTS.CREATE_FLOW.STACKBOX_STACK_CLICK);
            createStack();
          }}
          width="full"
          ref={focusBtnRef}
          disabled={step === CREATE_STACK_STEPS.approve}
        >
          Stack now
        </Button>
      </ModalFooter>
      <DialogConfirmTransactionLoading
        isOpen={isModalOpen(ModalId.STACK_APPROVE_PROCESSING)}
        title={approveTx && "Proceeding approval"}
        description={approveTx && "Waiting for transaction confirmation."}
      >
        {approveTx?.hash && chainId && (
          <TransactionLink chainId={chainId} hash={approveTx.hash} />
        )}
      </DialogConfirmTransactionLoading>
      <DialogConfirmTransactionLoading
        closeAction={() => closeModal(ModalId.STACK_CREATION_PROCESSING)}
        isOpen={isModalOpen(ModalId.STACK_CREATION_PROCESSING)}
        title={stackCreationTx && "Proceeding stack creation"}
        description={stackCreationTx && "Waiting for transaction confirmation."}
      >
        {stackCreationTx?.hash && chainId && (
          <TransactionLink chainId={chainId} hash={stackCreationTx.hash} />
        )}
      </DialogConfirmTransactionLoading>
    </Modal>
  );
};
