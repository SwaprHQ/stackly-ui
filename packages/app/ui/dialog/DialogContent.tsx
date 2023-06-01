import { BodyText, TitleText } from "@/ui/text";

interface DialogTextProps {
  title?: string;
  description?: string;
  className?: string;
}

export const DialogContent = ({
  title,
  description,
  className,
}: DialogTextProps) => (
  <div className="space-y-1 text-center">
    {title && (
      <TitleText className={`text-white ${className}`}>{title}</TitleText>
    )}
    {description && (
      <BodyText className="text-white/70">{description}</BodyText>
    )}
  </div>
);
