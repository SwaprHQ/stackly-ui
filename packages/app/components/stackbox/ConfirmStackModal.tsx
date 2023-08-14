"use client";

import { useEffect, useRef, useState } from "react";
import { parseUnits } from "viem";
import { format } from "date-fns";
import { useAccount, useNetwork } from "wagmi";
import {
  ChainId,
  createDCAOrderWithNonce,
  getERC20Contract,
  getOrderFactory,
  getOrderFactoryAddress,
} from "@stackly/sdk";
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
  TransactionLink,
} from "@/components";
import { Token } from "@/models/token";
import { FREQUENCY_OPTIONS, Transaction } from "@/models/stack";
import { useEthersSigner } from "@/utils/ethers";
import { ModalId, useModalContext } from "@/contexts";
import { dateToUnixTimestamp } from "@/utils/datetime";

interface ConfirmStackModalProps extends ModalBaseProps {
  fromToken: Token;
  toToken: Token;
  amount: string;
  frequency: FREQUENCY_OPTIONS;
  startTime: Date;
  endTime: Date;
  onSuccess: () => void;
}

const HOUR_IN_MILISECONDS = 60 * 60 * 1000;
const DAY_IN_MILISECONDS = 24 * HOUR_IN_MILISECONDS;

const frequencySeconds = {
  [FREQUENCY_OPTIONS.hour]: HOUR_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.day]: DAY_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.week]: 7 * DAY_IN_MILISECONDS,
  [FREQUENCY_OPTIONS.month]: 30 * DAY_IN_MILISECONDS,
};

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

const INITAL_ORDER = 1;

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
  const { chain } = useNetwork();
  const signer = useEthersSigner({ chainId: chain?.id });
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
    if (!signer || !address) return;

    try {
      const factoryAddress = getOrderFactoryAddress(chain?.id as ChainId);
      getERC20Contract(fromToken.address, signer)
        .allowance(address, factoryAddress)
        .then((value) => setAllowance(value.toString()));
    } catch (e) {
      console.error(e);
    }
  }, [signer, address, fromToken.address, chain]);

  const approveFromToken = async () => {
    if (!signer || !address || !chain) return;

    const sellTokenContract = getERC20Contract(fromToken.address, signer);

    try {
      openModal(ModalId.STACK_APPROVE_PROCESSING);
      const approveFactoryTransaction = await sellTokenContract.approve(
        getOrderFactoryAddress(chain.id),
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
    if (!signer || !address || !chain) return;

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
      getOrderFactoryAddress(chain.id),
      signer
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
              Stacks{" "}
              <span className="text-em-high">
                {amountPerOrder} {fromToken.symbol}
              </span>{" "}
              worth of <span className="text-em-high">{toToken.symbol}</span>{" "}
              every {FREQUENCY_OPTIONS[frequency]}
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
                {amount} {fromToken.symbol}
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
            onClick={approveFromToken}
            width="full"
            ref={focusBtnRef}
            className="whitespace-nowrap"
          >
            Approve {fromToken.symbol}
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
      <DialogConfirmTransactionLoading
        isOpen={isModalOpen(ModalId.STACK_APPROVE_PROCESSING)}
        title={approveTx && "Proceeding approval"}
        description={approveTx && "Waiting for transaction confirmation."}
      >
        {approveTx?.hash && <TransactionLink hash={approveTx.hash} />}
      </DialogConfirmTransactionLoading>
      <DialogConfirmTransactionLoading
        isOpen={isModalOpen(ModalId.STACK_CREATION_PROCESSING)}
        title={stackCreationTx && "Proceeding stack creation"}
        description={stackCreationTx && "Waiting for transaction confirmation."}
      >
        {stackCreationTx?.hash && (
          <TransactionLink hash={stackCreationTx.hash} />
        )}
      </DialogConfirmTransactionLoading>
    </Modal>
  );
};
