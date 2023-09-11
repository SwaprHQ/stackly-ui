import * as IconList from "@/public/assets/icons";

export type IconName =
  | "arrow-external"
  | "arrow-left"
  | "blocks"
  | "caret-down"
  | "caret-left"
  | "caret-right"
  | "caret-up"
  | "check"
  | "close"
  | "discord"
  | "menu"
  | "plus"
  | "twitter"
  | "search"
  | "swap"
  | "swapr"
  | "warning";

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
  "caret-up": IconList.CaretUpIcon,
  check: IconList.CheckmarkIcon,
  close: IconList.CloseIcon,
  discord: IconList.DiscordIcon,
  menu: IconList.HamburgerIcon,
  plus: IconList.PlusIcon,
  search: IconList.SearchIcon,
  swap: IconList.SwapIcon,
  swapr: IconList.SwaprIcon,
  twitter: IconList.TwitterIcon,
  warning: IconList.WarningIcon,
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
