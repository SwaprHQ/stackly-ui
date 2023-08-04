import { DotsSpinnerImg } from "@/public/assets";
import { Dialog, DialogContent } from "@/ui";
import { ReactNode } from "react";

interface DialogConfirmTransactionLoadingProps {
  isOpen: boolean;
  closeAction?: () => void;
  children?: ReactNode;
}

export const DialogConfirmTransactionLoading = ({
  closeAction,
  isOpen,
  children,
}: DialogConfirmTransactionLoadingProps) => (
  <Dialog closeAction={closeAction ? closeAction : () => {}} isOpen={isOpen}>
    <DotsSpinnerImg className="animate-spin" />
    <DialogContent
      description="Confirm this transaction in your wallet."
      title="Waiting for confirmation"
    />
    {children}
  </Dialog>
);
