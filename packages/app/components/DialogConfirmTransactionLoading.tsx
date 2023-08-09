import { DotsSpinnerImg } from "@/public/assets";
import { Dialog, DialogContent } from "@/ui";
import { ReactNode } from "react";

interface DialogConfirmTransactionLoadingProps {
  isOpen: boolean;
  closeAction?: () => void;
  children?: ReactNode;
  title?: string;
  description?: string;
}

export const DialogConfirmTransactionLoading = ({
  closeAction,
  isOpen,
  children,
  title = "Waiting for confirmation",
  description = "Confirm this transaction in your wallet.",
}: DialogConfirmTransactionLoadingProps) => (
  <Dialog closeAction={closeAction ? closeAction : () => {}} isOpen={isOpen}>
    <DotsSpinnerImg className="animate-spin" />
    <DialogContent description={description} title={title} />
    {children}
  </Dialog>
);
