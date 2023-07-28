"use client";

import { useRef, useState } from "react";

import { UISection } from "@/app/ui/sections/UISection";
import { UISubSection } from "@/app/ui/sections/UISubSection";
import { ConfirmStackModal, TokenPicker } from "@/components";
import { ModalId, useModalContext } from "@/contexts";
import {
  Button,
  ButtonLink,
  CaptionText,
  Dialog,
  DialogFooterActions,
  Icon,
  IconName,
  iconMap,
  ChipButton,
  RadioButton,
  BodyText,
  TitleText,
  DisplayText,
  HeadingText,
  OverlineText,
  DialogContent,
  Toast,
  Severity,
} from "@/ui";

export default function Page() {
  //  radioButtons
  const [activeRadionButton, setActiveRadioButton] = useState("0");
  // dialogs
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isOpenCancelStackingDialog, setOpenCancelStackingDialog] =
    useState(false);
  const dialogBtnRef = useRef<HTMLButtonElement>(null);
  const { closeModal, openModalId, openModal } = useModalContext();

  const dialogButtons = [
    {
      label: "Confirm",
      onClick: () => setOpenCancelStackingDialog(true),
    },
    {
      label: "Error",
      onClick: () => setErrorDialogOpen(true),
    },
  ];

  const modalButtons = [
    {
      label: "Confirm Stack",
      onClick: () => openModal(ModalId.CONFIRM_STACK),
    },
    {
      label: "Token Picker",
      onClick: () => openModal(ModalId.TOKEN_PICKER),
    },
    {
      label: "Toast",
      onClick: () => openModal(ModalId.TOAST_CONTAINER),
    },
  ];

  const textComponents = [
    {
      sizes: [3, 2, 1],
      TextComponent: DisplayText,
      title: "Display",
    },

    {
      sizes: [6, 5, 4, 3, 2, 1],
      TextComponent: HeadingText,
      title: "Heading",
    },

    {
      sizes: [2, 1],
      TextComponent: TitleText,
      title: "Title",
    },

    {
      sizes: [3, 2, 1],
      TextComponent: BodyText,
      title: "Body",
    },

    {
      sizes: [2, 1],
      TextComponent: CaptionText,
      title: "Caption",
    },

    {
      TextComponent: OverlineText,
      title: "Overline",
    },
  ];

  return (
    <div className="my-10">
      <HeadingText as="h1" size={6}>
        Stackly UI
      </HeadingText>
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
            name="monday"
            id="monday"
            checked={activeRadionButton === "0"}
            value={"0"}
            onChange={(e) => setActiveRadioButton(e.target.value)}
          >
            Monday
          </RadioButton>
          <RadioButton
            name="tueday"
            id="tueday"
            checked={activeRadionButton === "1"}
            value={"1"}
            onChange={(e) => setActiveRadioButton(e.target.value)}
          >
            Tuesday
          </RadioButton>
          <RadioButton
            name="wednesday"
            id="wednesday"
            checked={activeRadionButton === "2"}
            value={"2"}
            onChange={(e) => setActiveRadioButton(e.target.value)}
          >
            Wednesday
          </RadioButton>
        </div>
      </UISection>
      <UISection title="Icons">
        <div className="flex flex-wrap space-x-4 space-y-2 md:space-y-0">
          {Object.keys(iconMap).map((iconName) => (
            <div
              className="flex flex-col items-center space-y-2"
              key={iconName}
            >
              <Icon name={iconName as IconName} size={24} />
              <div className="p-1 rounded-lg bg-surface-75">
                <BodyText weight="medium">{iconName}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </UISection>
      <UISection title="Modal">
        <UISubSection title="Examples">
          {modalButtons.map((modal) => (
            <DialogModalButton
              key={modal.label}
              label={modal.label}
              onClick={modal.onClick}
            />
          ))}
          <ConfirmStackModal
            isOpen={openModalId === ModalId.CONFIRM_STACK}
            closeAction={closeModal}
          />
          <TokenPicker
            closeAction={closeModal}
            isOpen={openModalId === ModalId.TOKEN_PICKER}
            onTokenSelect={closeModal}
          />
          <Toast
            closeAction={closeModal}
            isOpen={openModalId === ModalId.TOAST_CONTAINER}
            severity={Severity.SUCCESS}
            title="Your stack creation was successful"
          >
            <BodyText className="text-em-med">View your stacks</BodyText>
          </Toast>
        </UISubSection>
      </UISection>
      <UISection title="Dialog">
        <UISubSection title="Examples">
          {dialogButtons.map((dialog) => (
            <DialogModalButton
              key={dialog.label}
              label={dialog.label}
              onClick={dialog.onClick}
            />
          ))}
          <Dialog
            initialFocusRef={dialogBtnRef}
            isOpen={isOpenCancelStackingDialog}
            closeAction={() => setOpenCancelStackingDialog(false)}
          >
            <DialogContent
              title=" Are you sure you want to cancel stacking?"
              description="The remaining funds of 684.5 USDC will be sent back to your
                wallet 0xb9."
            />
            <DialogFooterActions
              primaryAction={() => console.log("primary")}
              primaryText="Keep stacking"
              secondaryAction={() => setOpenCancelStackingDialog(false)}
              secondaryText="Cancel"
              ref={dialogBtnRef}
            />
          </Dialog>
          <Dialog
            isOpen={isErrorDialogOpen}
            closeAction={() => setErrorDialogOpen(false)}
          >
            <Icon name="warning" className="text-danger-500" size={38} />
            <DialogContent
              className="!text-danger-200"
              title="An error has occurred"
              description="A short description showing the user how to solve this error with a bit of details."
            />
            <DialogFooterActions
              primaryAction={() => console.log("try again")}
              primaryText="Try again"
              secondaryAction={() => setErrorDialogOpen(false)}
              secondaryText="Dismiss"
            />
          </Dialog>
        </UISubSection>
      </UISection>
      <UISection
        title="Text components"
        description="Text components accept variant, bold and classname props."
      >
        {textComponents.map((textSection) => (
          <ExampleTextComponents
            key={textSection.title}
            sizes={textSection.sizes}
            TextComponent={textSection.TextComponent}
            title={textSection.title}
          />
        ))}
      </UISection>
    </div>
  );
}

interface DialogModalButtonProps {
  label: string;
  onClick: (args?: any) => void;
}

const DialogModalButton = ({ label, onClick }: DialogModalButtonProps) => (
  <Button action="tertiary" size="sm" onClick={onClick}>
    {label}
  </Button>
);

interface ExampleTextComponentProps {
  sizes?: number[];
  TextComponent: any;
  title: string;
}

const ExampleTextComponents = ({
  sizes,
  TextComponent,
  title,
}: ExampleTextComponentProps) => (
  <UISubSection title={title}>
    <div className="space-y-2">
      {sizes ? (
        sizes.map((size) => (
          <div className="flex items-baseline space-x-4" key={size}>
            <p>{size}.</p>
            <TextComponent size={size}>
              I want to DCA with Stackly
            </TextComponent>
          </div>
        ))
      ) : (
        <TextComponent>I want to DCA with Stackly</TextComponent>
      )}
    </div>
  </UISubSection>
);
