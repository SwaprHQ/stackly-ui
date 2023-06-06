import { BodyText } from "@/ui";

export const TextDivider = ({
  left,
  right,
}: {
  left: string;
  right: string;
}) => (
  <div className="flex items-center justify-end space-x-1 min-w-max">
    <BodyText className="text-em-high">{left}</BodyText>
    <BodyText className="text-em-low">{right}</BodyText>
  </div>
);
