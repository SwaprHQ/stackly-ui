import { SectionProps } from "@/app/ui/sections/UISection";
import { BodyText, HeadingText } from "@/ui";

export const UISubSection = ({
  title,
  children,
  description,
}: SectionProps) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <HeadingText>{title}</HeadingText>
      {description && (
        <BodyText className="text-em-med">{description}</BodyText>
      )}
    </div>
    <div className="flex flex-wrap items-start space-x-6 space-y-3 lg:space-y-2 xl:space-y-0">
      {children}
    </div>
  </div>
);
