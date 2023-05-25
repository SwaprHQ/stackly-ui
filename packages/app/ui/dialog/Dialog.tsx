import { Modal } from "@/ui/modal";
import { ReactNode } from "react";

export interface DialogBaseProps {
  isOpen: boolean;
  closeAction: () => void;
}
interface DialogProps extends DialogBaseProps {
  children: ReactNode;
}

export const Dialog = ({ isOpen, closeAction, children }: DialogProps) => (
  <Modal isOpen={isOpen} close={closeAction} size="almostFull">
    <div className="flex flex-col items-center px-6 py-8 space-y-3 bg-gray-900 shadow-xl">
      {children}
    </div>
  </Modal>
);
