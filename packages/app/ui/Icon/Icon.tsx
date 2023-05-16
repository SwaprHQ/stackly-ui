import { PlusIcon } from "@/ui/icons/PlusIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";

export type IconName = "close" | "plus";

const getIconComponent = (name: IconName) => {
  switch (name) {
    case "plus":
      return <PlusIcon />;
    case "close":
      return <CloseIcon />;
    default:
      return null;
  }
};

export const Icon = ({ name }: { name: IconName }) => {
  return <>{getIconComponent(name)}</>;
};
