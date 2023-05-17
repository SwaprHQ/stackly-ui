"use client";

import { UISection } from "@/app/ui/sections/UISection";
import { UISubSection } from "@/app/ui/sections/UISubSection";
import { Button, ButtonLink, Icon, IconName, iconMap } from "@/ui";

export default function Page() {
  return (
    <div className="m-10">
      <h1 className="text-3xl font-medium">Stackly UI</h1>
      <UISection
        title="Buttons"
        description="This is a collection of all our current buttons divided by actions."
      >
        <UISubSection title="primary">
          <Button size="lg" onClick={() => console.log("hey")}>
            Try Stackly now
          </Button>
          <Button iconLeft="plus" onClick={() => console.log("hey")}>
            Stack now
          </Button>
          <Button size="sm" onClick={() => console.log("hey")}>
            Connect wallet
          </Button>
          <Button size="sm" active={true} onClick={() => console.log("hey")}>
            active
          </Button>
          <Button size="sm" disabled={true} onClick={() => console.log("hey")}>
            button disabled
          </Button>
        </UISubSection>
        <UISubSection title="secondary">
          <Button
            action="secondary"
            iconLeft="plus"
            onClick={() => console.log("hey")}
            size="lg"
          >
            Try Stackly now
          </Button>
          <Button
            action="secondary"
            size="icon"
            iconRight="close"
            onClick={() => console.log("hey")}
          ></Button>
          <ButtonLink action="secondary" size="sm" href="/">
            soy un ButtonLink
          </ButtonLink>
        </UISubSection>
        <UISubSection title="tertiary">
          <Button
            action="tertiary"
            iconLeft="plus"
            iconRight="close"
            onClick={() => console.log("hey")}
            size="lg"
          >
            Try Stackly now
          </Button>
          <Button
            action="tertiary"
            active={true}
            onClick={() => console.log("hey")}
          >
            Cancel
          </Button>
        </UISubSection>
        <UISubSection title="quaternary">
          <Button
            action="quaternary"
            iconLeft="blocks"
            onClick={() => console.log("hey")}
          >
            Your stacks
          </Button>
          <Button
            action="quaternary"
            active={true}
            onClick={() => console.log("hey")}
          >
            Cancel
          </Button>
        </UISubSection>
      </UISection>
      <UISection title="Icons">
        <div className="flex flex-wrap space-x-4 space-y-2 md:space-y-0">
          {Object.keys(iconMap).map((iconName) => (
            <div
              className="flex flex-col items-center space-y-2"
              key={iconName}
            >
              <Icon name={iconName as IconName} />
              <p className="p-1 text-xs rounded-lg bg-surface-75">{iconName}</p>
            </div>
          ))}
        </div>
      </UISection>
    </div>
  );
}
