import { Button, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  closeAction: () => void;
  title: string;
}

export const ModalHeaderTitle = ({
  closeAction,
  title,
}: ModalHeaderTitleProps) => (
  <ModalHeader>
    <TitleText size={2}>{title}</TitleText>
    <Button
      variant="quaternary"
      iconLeft="close"
      onClick={closeAction}
      size="icon"
    />
  </ModalHeader>
);
