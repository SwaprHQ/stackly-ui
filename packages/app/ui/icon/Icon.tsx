import PlusIcon from "../../public/assets/icons/plus.svg";
import HamburgerIcon from "../../public/assets/icons/hamburger.svg";
import CloseIcon from "../../public/assets/icons/close.svg";
import BlocksIcon from "../../public/assets/icons/blocks.svg";
import CaretLeftIcon from "../../public/assets/icons/caret-left.svg";
import CaretDownIcon from "../../public/assets/icons/caret-down.svg";
import CaretRightIcon from "../../public/assets/icons/caret-right.svg";
import SwapIcon from "../../public/assets/icons/swap.svg";
import WarningIcon from "../../public/assets/icons/warning.svg";
import CheckIcon from "../../public/assets/icons/check.svg";
import ArrowLeftIcon from "../../public/assets/icons/arrow-left.svg";
import ArrowExternalIcon from "../../public/assets/icons/arrow-external.svg";
import SearchIcon from "../../public/assets/icons/search.svg";

export type IconName =
  | "close"
  | "plus"
  | "menu"
  | "blocks"
  | "check"
  | "arrow-left"
  | "arrow-external"
  | "warning"
  | "swap"
  | "caret-down"
  | "caret-left"
  | "caret-right"
  | "search";

export const iconMap: Record<IconName, any> = {
  blocks: BlocksIcon,
  plus: PlusIcon,
  close: CloseIcon,
  menu: HamburgerIcon,
  check: CheckIcon,
  "arrow-left": ArrowLeftIcon,
  "arrow-external": ArrowExternalIcon,
  warning: WarningIcon,
  swap: SwapIcon,
  "caret-down": CaretDownIcon,
  "caret-left": CaretLeftIcon,
  "caret-right": CaretRightIcon,
  search: SearchIcon
};

const getIcon = (name: IconName) => iconMap[name];

export const Icon = ({
  name,
  size = 20,
  alt,
  className
}: {
  name: IconName;
  size?: number;
  alt?: string;
  className?: string;
}) => {
  const IconComponent = getIcon(name);

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      title={alt ? alt : name}
    />
  );
};
