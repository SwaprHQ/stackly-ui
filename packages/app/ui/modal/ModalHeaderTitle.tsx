import { Button, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  title: string;
  closeAction: () => void;
}

export const ModalHeaderTitle = ({
  title,
  closeAction
}: ModalHeaderTitleProps) => (
  <ModalHeader className="flex items-center justify-between w-full pl-6 pr-4 pt-4 pb-2">
    <TitleText size={2}>{title}</TitleText>
    <Button
      className="m-2.5 p-0"
      action="quaternary"
      iconLeft="close"
      size="icon"
      onClick={closeAction}
    />
  </ModalHeader>
);
