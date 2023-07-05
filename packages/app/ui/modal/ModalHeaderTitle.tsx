import { Button, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  closeAction: () => void;
  title: string;
}

export const ModalHeaderTitle = ({
  closeAction,
  title
}: ModalHeaderTitleProps) => (
  <ModalHeader>
    <TitleText size={2}>{title}</TitleText>
    <Button
      action="quaternary"
      iconLeft="close"
      size="icon"
      onClick={closeAction}
    />
  </ModalHeader>
);
