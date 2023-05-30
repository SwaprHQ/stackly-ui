import { BodyText, HeadingText } from "@/ui";
import { ReactNode } from "react";

export interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export const UISection = ({ title, children, description }: SectionProps) => (
  <div className="pb-12 my-12 space-y-5 border-b">
    <div className="space-y-1">
      <HeadingText variant={3}>{title}</HeadingText>
      {description && (
        <BodyText variant={1} className="text-em-med">
          {description}
        </BodyText>
      )}
    </div>
    {children}
  </div>
);
