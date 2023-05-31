import StackOfCoinsImage from "@/public/assets/images/empty-state-stacks-coins.svg";
import { ButtonLink, HeadingText } from "@/ui";

export const Empty = () => (
  <div className="max-w-xl pt-32 mx-auto space-y-8">
    <div className="flex flex-col items-center space-y-6 md:space-y-8">
      <StackOfCoinsImage />
      <div className="space-y-3 text-center">
        <HeadingText size={2}>
          {"Looks like you haven't created any stacks yet."}
        </HeadingText>
        <HeadingText size={1} weight="medium" className="text-em-med">
          Simply click the button below to create your first stack. Once you
          have created a stack, you can view its progress here.
        </HeadingText>
      </div>
    </div>
    <ButtonLink href="/" iconLeft="plus" width="fit" className="mx-auto">
      Create stack
    </ButtonLink>
  </div>
);
