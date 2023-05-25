import DotsSpinner from "public/assets/images/dots-spinner.svg";
import { Dialog, DialogBaseProps, DialogText } from "@/ui";

export const StackTransactionLoading = ({
  isOpen,
  closeAction,
}: DialogBaseProps) => (
  <Dialog isOpen={isOpen} closeAction={closeAction}>
    <DotsSpinner className="animate-spin" />
    <DialogText
      title="Waiting for confirmation"
      description="Confirm this transaction in your wallet."
    />
  </Dialog>
);
