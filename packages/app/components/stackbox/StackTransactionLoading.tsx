import { DotsSpinnerImg } from "@/public/assets";
import { Dialog, DialogContent, ModalBaseProps } from "@/ui";

export const StackTransactionLoading = ({
  closeAction,
  isOpen
}: ModalBaseProps) => (
  <Dialog closeAction={closeAction} isOpen={isOpen}>
    <DotsSpinnerImg className="animate-spin" />
    <DialogContent
      description="Confirm this transaction in your wallet."
      title="Waiting for confirmation"
    />
  </Dialog>
);
