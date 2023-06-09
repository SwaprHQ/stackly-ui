import { BodyText } from "@/ui";
import { ReactNode } from "react";

export const StackDetail = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="space-y-1">
    <BodyText size={1} className="text-em-low">
      {title}
    </BodyText>
    <BodyText size={1}>{children}</BodyText>
  </div>
);
