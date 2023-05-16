import { SectionProps } from "@/app/ui/sections/UISection";

export const UISubSection = ({
  title,
  children,
  description,
}: SectionProps) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <h3 className="font-semibold">{title}</h3>
      {description && <p className="text-sm text-em-med">{description}</p>}
    </div>
    <div className="flex flex-wrap items-start space-x-6 space-y-3 lg:space-y-2 xl:space-y-0">
      {children}
    </div>
  </div>
);
