import { Button, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  closeAction: () => void;
  title: string;
  withDivider?: boolean;
}

export const ModalHeaderTitle = ({
  closeAction,
  title,
  withDivider,
}: ModalHeaderTitleProps) => (
  <ModalHeader>
    <TitleText size={2}>{title}</TitleText>
    <Button
      action="quaternary"
      iconLeft="close"
      onClick={closeAction}
      size="icon"
    />
  </ModalHeader>
);
