import { useRef, useState } from "react";
import { StackTransactionLoading } from "@/components/stackbox/StackTransactionLoading";
import {
  Modal,
  ModalFooter,
  Icon,
  Button,
  ModalContent,
  ModalHeaderTitle,
  BodyText,
  TitleText,
} from "@/ui";

interface ConfirmStackModalProps {
  isOpen: boolean;
  closeAction: () => void;
}

export const ConfirmStackModal = ({
  isOpen,
  closeAction,
}: ConfirmStackModalProps) => {
  const focusBtnRef = useRef<HTMLButtonElement>(null);
  const [isTransactionLoadingDialogOpen, setTransactionLoadingDialogOpen] =
    useState(false);

  function stack() {
    setTransactionLoadingDialogOpen(true);
  }

  return (
    <Modal isOpen={isOpen} close={closeAction} initialFocusRef={focusBtnRef}>
      <ModalHeaderTitle title="Confirm Stack" closeAction={closeAction} />
      <ModalContent>
        <div className="space-y-6">
          <div className="flex items-center px-4 py-2 mx-auto space-x-4 bg-surface-25 rounded-3xl w-fit">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary-100"></div>
              <TitleText>USDC</TitleText>
            </div>
            <Icon
              size={36}
              className="w-12 p-2 rotate-180 rounded-full bg-surface-75"
              name="arrow-left"
            />
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary-100"></div>
              <TitleText>WETH</TitleText>
            </div>
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
      <StackTransactionLoading
        isOpen={isTransactionLoadingDialogOpen}
        closeAction={() => setTransactionLoadingDialogOpen(false)}
      />
    </Modal>
  );
};
