import { Button } from "@/ui/buttons";
import { ModalHeader } from "@/ui/modal/ModalHeader";

interface ModalHeaderTitleProps {
  title: string;
  closeAction: () => void;
}

export const ModalHeaderTitle = ({
  title,
  closeAction,
}: ModalHeaderTitleProps) => (
  <ModalHeader>
    <div className="flex items-center justify-between w-full">
      <h3 className="text-lg font-medium leading-6 text-em-high">{title}</h3>
      <Button
        action="quaternary"
        iconLeft="close"
        size="icon"
        onClick={closeAction}
      />
    </div>
  </ModalHeader>
);
