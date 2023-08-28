import { Modal, ModalBaseProps } from "@/ui/modal";
import { ReactNode, RefObject } from "react";

interface DialogProps extends ModalBaseProps {
  children: ReactNode;
  initialFocusRef?: RefObject<HTMLButtonElement | HTMLInputElement>;
}

export const Dialog = ({
  isOpen,
  closeAction,
  initialFocusRef,
  children,
}: DialogProps) => (
  <Modal
    isOpen={isOpen}
    closeAction={closeAction}
    maxWidth="sm"
    initialFocusRef={initialFocusRef}
  >
    <div className="flex flex-col items-center p-6 space-y-3 bg-gray-900 shadow-xl">
      {children}
    </div>
  </Modal>
);
