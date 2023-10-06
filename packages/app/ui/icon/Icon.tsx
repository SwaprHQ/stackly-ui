import * as IconList from "public/assets/icons";

export type IconName =
  | "arrow-external"
  | "arrow-left"
  | "blocks"
  | "caret-down"
  | "caret-left"
  | "caret-right"
  | "check"
  | "close"
  | "info"
  | "menu"
  | "plus"
  | "search"
  | "stackly"
  | "swap"
  | "warning"
  | "discord"
  | "share";

interface IconProps {
  alt?: string;
  className?: string;
  name: IconName;
  size?: number;
}

export const iconMap: Record<IconName, any> = {
  "arrow-external": IconList.ArrowExternalIcon,
  "arrow-left": IconList.ArrowLeftIcon,
  blocks: IconList.FourBlocksIcon,
  "caret-down": IconList.CaretDownIcon,
  "caret-left": IconList.CaretLeftIcon,
  "caret-right": IconList.CaretRightIcon,
  check: IconList.CheckmarkIcon,
  close: IconList.CloseIcon,
  info: IconList.InfoIcon,
  menu: IconList.HamburgerIcon,
  plus: IconList.PlusIcon,
  search: IconList.SearchIcon,
  stackly: IconList.StacklyLogoIcon,
  swap: IconList.SwapIcon,
  warning: IconList.WarningIcon,
  discord: IconList.DiscordIcon,
  share: IconList.ShareIcon,
};

export const Icon = ({ alt, className, name, size = 20 }: IconProps) => {
  const IconComponent = iconMap[name];

  return (
    <IconComponent
      className={className}
      height={size}
      title={alt ? alt : name}
      width={size}
    />
  );
};
