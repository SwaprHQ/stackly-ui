import { ReactNode } from "react";

export interface SectionProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export const UISection = ({ title, children, description }: SectionProps) => (
  <div className="pb-12 my-12 space-y-5 border-b">
    <div className="space-y-1">
      <h2 className="text-2xl font-medium">{title}</h2>
      {description && <p className="text-em-med">{description}</p>}
    </div>
    {children}
  </div>
);
