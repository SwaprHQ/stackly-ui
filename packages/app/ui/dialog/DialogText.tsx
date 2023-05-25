interface DialogTextProps {
  title?: string;
  description?: string;
  className?: string;
}

export const DialogText = ({
  title,
  description,
  className,
}: DialogTextProps) => (
  <div className="space-y-1 text-center">
    {title && (
      <p className={`text-lg font-medium text-white ${className}`}>{title}</p>
    )}
    {description && <p className="text-sm text-white/70">{description}</p>}
  </div>
);
