import { ButtonLink, HeadingText } from "@/ui";
import { EmptyStateStacksImg } from "@/public/assets";
import { PATHNAMES } from "@/constants";

export default function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex flex-col items-center space-y-6 md:space-y-8">
        <EmptyStateStacksImg />
        <div className="space-y-3 text-center">
          <HeadingText size={3}>
            {"Looks like you haven't created any stacks yet."}
          </HeadingText>
          <HeadingText size={1} weight="medium" className="text-em-med">
            Once you have created a stack, you can view its progress here.
          </HeadingText>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <ButtonLink size="lg" href={PATHNAMES.HOME} iconLeft="plus">
          Create new stack
        </ButtonLink>
      </div>
    </div>
  );
}
