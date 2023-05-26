import { Modal } from "@/ui/modal";
import { ReactNode, RefObject } from "react";

export interface DialogBaseProps {
  isOpen: boolean;
  closeAction: () => void;
}
interface DialogProps extends DialogBaseProps {
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
    close={closeAction}
    size="almostFull"
    initialFocusRef={initialFocusRef}
  >
    <div className="flex flex-col items-center px-6 py-8 space-y-3 bg-gray-900 shadow-xl">
      {children}
    </div>
  </Modal>
);
