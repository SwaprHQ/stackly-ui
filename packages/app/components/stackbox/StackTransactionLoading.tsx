import DotsSpinner from "public/assets/images/dots-spinner.svg";
import { Dialog, DialogContent, ModalBaseProps } from "@/ui";

export const StackTransactionLoading = ({
  isOpen,
  closeAction,
}: ModalBaseProps) => (
  <Dialog isOpen={isOpen} closeAction={closeAction}>
    <DotsSpinner className="animate-spin" />
    <DialogContent
      title="Waiting for confirmation"
      description="Confirm this transaction in your wallet."
    />
  </Dialog>
);
