"use client";

import { UISection } from "@/app/ui/sections/UISection";
import { UISubSection } from "@/app/ui/sections/UISubSection";
import {
  Button,
  ButtonLink,
  Dialog,
  DialogFooterActions,
  DialogText,
  Icon,
  IconName,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeaderTitle,
  iconMap,
  ChipButton,
  RadioButton,
  BodyText,
  TitleText,
  DisplayText,
  HeadingText,
  OverlineText,
} from "@/ui";
import { CaptionText } from "@/ui/text/CaptionText";
import { useRef, useState } from "react";

export default function Page() {
  //  radioButtons
  const [activeRadionButton, setActiveRadioButton] = useState("0");
  // modals
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isTokenPickerOpen, setTokenPickerOpen] = useState(false);
  // dialogs
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isOpenCancelStackingDialog, setOpenCancelStackingDialog] =
    useState(false);
  const dialogBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="my-10">
      <HeadingText as="h1" variant={1}>
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
                <BodyText>{iconName}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </UISection>
      <UISection title="Modal">
        <UISubSection title="Examples">
          <Button
            action="tertiary"
            size="sm"
            onClick={() => setConfirmModalOpen(true)}
          >
            confirm modal
          </Button>
          <Button
            action="tertiary"
            size="sm"
            onClick={() => setTokenPickerOpen(true)}
          >
            token picker
          </Button>
          <Modal
            isOpen={isConfirmModalOpen}
            close={() => setConfirmModalOpen(false)}
          >
            <ModalHeaderTitle
              title="Confirm Stack"
              closeAction={() => setConfirmModalOpen(false)}
            />
            <ModalContent>
              <div className="space-y-6">
                <div className="flex items-center justify-center p-2 bg-surface-25 rounded-xl">
                  <p>USDC</p>
                  <Icon className="rotate-180" name="arrow-left" />
                  <p>WETH</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-center text-em-low">
                    Stacks <span className="text-em-high">62.5 USDC</span> worth
                    of <span className="text-em-high">WETH</span> every hour
                  </p>
                </div>
                <div className="w-full h-32 p-3 space-y-2 bg-surface-25 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-em-med">Starts on</p>
                    <p className="text-sm">1 Jun 23, 2:00 PM</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-em-med">Ends on</p>
                    <p className="text-sm">30 Jun 23, 2:00 PM</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-em-med">
                      Total funds to be used
                    </p>
                    <p className="text-sm">1000 USDC</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-em-med">Stack fee</p>
                    <p className="text-sm">0.05%</p>
                  </div>
                </div>
              </div>
            </ModalContent>
            <ModalFooter>
              <>
                <Button
                  action="tertiary"
                  onClick={() => console.log("cancel")}
                  width="full"
                >
                  Cancel
                </Button>
                <Button
                  action="primary"
                  onClick={() => console.log("stack")}
                  width="full"
                >
                  Stack now
                </Button>
              </>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={isTokenPickerOpen}
            close={() => setTokenPickerOpen(false)}
          >
            <ModalHeaderTitle
              title="Select a token"
              closeAction={() => setTokenPickerOpen(false)}
            />
            <ModalContent>
              <div className="space-y-4">
                <input
                  type="search"
                  placeholder="search token name or paste address"
                  className="w-full p-2 bg-surface-75 rounded-xl"
                />
                <div className="py-3 space-y-2">
                  <p className="text-xs font-semibold text-em-low">
                    Common tokens
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 font-semibold uppercase border text-em-med w-fit rounded-2xl">
                      Eth
                    </div>
                    <div className="p-2 font-semibold uppercase border text-em-med w-fit rounded-2xl">
                      Pepe
                    </div>
                    <div className="p-2 font-semibold uppercase border text-em-med w-fit rounded-2xl">
                      usdc
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="-mx-4 overflow-y-auto border-t h-72 border-surface-50">
                    {[
                      "1Inch",
                      "Aave",
                      "DAI",
                      "USDC",
                      "Matic",
                      "Uni",
                      "pepe",
                      "Swapr",
                      "ARB",
                    ].map((token) => (
                      <div
                        className="flex justify-between w-full px-4 py-2 border-b cursor-pointer border-surface-50 hover:bg-surface-50"
                        key={token}
                        onClick={() => setTokenPickerOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100" />
                          <p className="text-sm font-medium">{token}</p>
                        </div>
                        <p>0</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </UISubSection>
      </UISection>
      <UISection title="Dialog">
        <UISubSection title="Examples">
          <Button
            action="tertiary"
            size="sm"
            onClick={() => setOpenCancelStackingDialog(true)}
          >
            confirm dialog
          </Button>
          <Button
            action="tertiary"
            size="sm"
            onClick={() => setErrorDialogOpen(true)}
          >
            error dialog
          </Button>
          <Dialog
            initialFocusRef={dialogBtnRef}
            isOpen={isOpenCancelStackingDialog}
            closeAction={() => setOpenCancelStackingDialog(false)}
          >
            <DialogText
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
            <DialogText
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
        <UISubSection title="Display">
          <div className="space-y-2">
            {([1, 2, 3] as Array<1 | 2 | 3>).map((variant) => (
              <div className="flex items-baseline space-x-4" key={variant}>
                <p>{variant}.</p>
                <DisplayText variant={variant}>
                  I want to DCA with Stackly
                </DisplayText>
              </div>
            ))}
          </div>
        </UISubSection>
        <UISubSection title="Heading">
          <div className="space-y-2">
            {([1, 2, 3, 4, 5, 6] as Array<1 | 2 | 3 | 4 | 5 | 6>).map(
              (variant) => (
                <div className="flex items-baseline space-x-4" key={variant}>
                  <p>{variant}.</p>
                  <HeadingText variant={variant}>
                    I want to DCA with Stackly
                  </HeadingText>
                </div>
              )
            )}
          </div>
        </UISubSection>
        <UISubSection title="Title">
          <div className="space-y-2">
            {([1, 2] as Array<1 | 2>).map((variant) => (
              <div className="flex items-baseline space-x-4" key={variant}>
                <p>{variant}.</p>
                <TitleText variant={variant}>
                  I want to DCA with Stackly
                </TitleText>
              </div>
            ))}
          </div>
        </UISubSection>
        <UISubSection title="Body">
          <div className="space-y-2">
            {([1, 2, 3] as Array<1 | 2>).map((variant) => (
              <div className="flex items-baseline space-x-4" key={variant}>
                <p>{variant}.</p>
                <BodyText variant={variant}>
                  I want to DCA with Stackly
                </BodyText>
              </div>
            ))}
          </div>
        </UISubSection>
        <UISubSection title="Caption">
          <div className="space-y-2">
            {([1, 2] as Array<1 | 2>).map((variant) => (
              <div className="flex items-baseline space-x-4" key={variant}>
                <p>{variant}.</p>
                <CaptionText variant={variant}>
                  I want to DCA with Stackly
                </CaptionText>
              </div>
            ))}
          </div>
        </UISubSection>
        <UISubSection title="Overline">
          <OverlineText> I want to DCA with Stackly</OverlineText>
        </UISubSection>
      </UISection>
    </div>
  );
}
