import { Button } from "@/ui/buttons";
import { ModalHeader } from "@/ui/modal/ModalHeader";
import { TitleText } from "@/ui/text";

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
      <TitleText>{title}</TitleText>
      <Button
        action="quaternary"
        iconLeft="close"
        size="icon"
        onClick={closeAction}
      />
    </div>
  </ModalHeader>
);
