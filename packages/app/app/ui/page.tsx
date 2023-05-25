"use client";

import { UISection } from "@/app/ui/sections/UISection";
import { UISubSection } from "@/app/ui/sections/UISubSection";
import {
  Button,
  ButtonLink,
  Icon,
  IconName,
  iconMap,
  ChipButton,
  RadioButton,
} from "@/ui";
import { useState } from "react";

export default function Page() {
  const [activeButton, setActiveButton] = useState("0");
  return (
    <div className="my-10">
      <h1 className="text-3xl font-medium">Stackly UI</h1>
      <UISection
        title="Buttons"
        description="This is a collection of all our current buttons divided by actions."
      >
        <UISubSection title="Primary">
          <Button size="lg" onClick={() => console.log("hey")}>
            Try Stackly now
          </Button>
          <Button iconLeft="plus" onClick={() => console.log("hey")}>
            Stack now
          </Button>
          <Button size="sm" onClick={() => console.log("hey")}>
            Connect wallet
          </Button>
          <Button
            size="sm"
            iconRight="caret-down"
            active={true}
            onClick={() => console.log("hey")}
          >
            Active
          </Button>
          <Button size="sm" disabled={true} onClick={() => console.log("hey")}>
            Button disabled
          </Button>
        </UISubSection>
        <UISubSection title="Secondary">
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
            Soy un ButtonLink
          </ButtonLink>
        </UISubSection>
        <UISubSection title="Tertiary">
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
        <UISubSection title="Quaternary">
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
              <Icon name={iconName as IconName} size={24} />
              <p className="p-1 text-xs rounded-lg bg-surface-75">{iconName}</p>
            </div>
          ))}
        </div>
      </UISection>
      <UISection title="Chip Buttons">
        <div className="flex flex-wrap space-x-4">
          <ChipButton
            active={true}
            onClick={() => {
              console.log("I'm active");
            }}
          >
            Active
          </ChipButton>
          <ChipButton
            active={false}
            onClick={() => {
              console.log("I'm inactive");
            }}
          >
            Inactive
          </ChipButton>
          <ChipButton onClick={() => console.log(" Eu tenho um icon")}>
            <Icon name="blocks" />
            <span>Eu tenho um icon</span>
          </ChipButton>
          <ChipButton onClick={() => console.log(" Eu tenho um icon")}>
            Hour
          </ChipButton>
          <ChipButton
            onClick={() => console.log("Eu tenho um icon")}
            disabled={true}
          >
            SWPR
          </ChipButton>
        </div>
      </UISection>
      <UISection title="Radio Buttons">
        <div className="flex flex-wrap space-x-4">
          <RadioButton
            name="test"
            id="first"
            checked={activeButton === "0"}
            value={"0"}
            onChange={(e) => {
              console.log(e.target.value);
              setActiveButton(e.target.value);
              console.log("I'm active");
            }}
          >
            Active
          </RadioButton>
          <RadioButton
            name="test"
            id="second"
            checked={activeButton === "1"}
            value={"1"}
            onChange={(e) => {
              console.log(e.target.value);
              setActiveButton(e.target.value);
              console.log("I'm inactive");
            }}
          >
            Inactive
          </RadioButton>
        </div>
      </UISection>
    </div>
  );
}
