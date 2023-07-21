import { Button, Icon, IconName, ModalHeader, TitleText } from "@/ui";

interface ModalHeaderTitleProps {
  closeAction: () => void;
  icon?: IconName;
  iconClassname?: string;
  title: string;
}

export const ModalHeaderTitle = ({
  closeAction,
  icon,
  iconClassname,
  title,
}: ModalHeaderTitleProps) => (
  <ModalHeader>
    {icon && <Icon className={iconClassname} name={icon} size={24} />}
    <TitleText size={2}>{title}</TitleText>
    <Button
      action="quaternary"
      iconLeft="close"
      size="icon"
      onClick={closeAction}
    />
  </ModalHeader>
);
