import {
  Modal,
  ModalFooter,
  Icon,
  Button,
  ModalContent,
  ModalHeaderTitle,
} from "@/ui";

interface ConfirmStackModalProps {
  isOpen: boolean;
  closeAction: () => void;
}

export const ConfirmStackModal = ({
  isOpen,
  closeAction,
}: ConfirmStackModalProps) => {
  function stack() {
    alert("stack");
  }

  return (
    <Modal isOpen={isOpen} close={closeAction}>
      <ModalHeaderTitle title="Confirm Stack" closeAction={closeAction} />
      <ModalContent>
        <div className="space-y-6">
          <div className="flex items-center justify-center p-2 bg-surface-25 rounded-xl">
            <p>USDC</p>
            <Icon className="rotate-180" name="arrow-left" />
            <p>WETH</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-center text-em-low">
              Stacks <span className="text-em-high">62.5 USDC</span> worth of{" "}
              <span className="text-em-high">WETH</span> every hour
            </p>
          </div>
          <div className="w-full h-32 p-3 space-y-2 bg-surface-25 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-em-med">Starts on</p>
              <p className="text-sm">1 Jun 23, 2:00 PM</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-em-med">Ends on</p>
              <p className="text-sm">30 Jun 23, 2:00 PM</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-em-med">Total funds to be used</p>
              <p className="text-sm">1000 USDC</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-em-med">Stack fee</p>
              <p className="text-sm">0.05%</p>
            </div>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <>
          <Button action="tertiary" onClick={closeAction} width="full">
            Cancel
          </Button>
          <Button action="primary" onClick={stack} width="full">
            Stack now
          </Button>
        </>
      </ModalFooter>
    </Modal>
  );
};
