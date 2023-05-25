import { Button } from "@/ui/buttons";

interface DialogFooterActions {
  primaryAction?: () => void;
  primaryText?: string;
  secondaryAction?: () => void;
  secondaryText?: string;
}
export const DialogFooterActions = ({
  primaryAction,
  primaryText,
  secondaryAction,
  secondaryText,
}: DialogFooterActions) => (
  <div className="flex w-full pt-4 space-x-2">
    {secondaryAction && (
      <Button
        size="sm"
        width="full"
        action="tertiary"
        onClick={secondaryAction}
        className="text-white border-none bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 focus:ring-gray-600 active:ring-gray-700"
      >
        {secondaryText}
      </Button>
    )}
    {primaryAction && (
      <Button size="sm" width="full" onClick={primaryAction}>
        {primaryText}
      </Button>
    )}
  </div>
);
