import { Button, Icon, IconName, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  closeAction: () => void;
  icon?: IconName;
  iconClassname?: string;
  title: string;
}

export const ModalHeaderTitle = ({
  closeAction,
  title,
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
