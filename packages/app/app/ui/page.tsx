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
} from "@/ui";
import { useState } from "react";

export default function Page() {
  // modals
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isTokenPickerOpen, setTokenPickerOpen] = useState(false);

  // dialogs
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isOpenCancelStackingDialog, setOpenCancelStackingDialog] =
    useState(false);

  return (
    <div className="my-10">
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
          <Button
            size="sm"
            iconRight="caret-down"
            active={true}
            onClick={() => console.log("hey")}
          >
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
              <Icon name={iconName as IconName} size={24} />
              <p className="p-1 text-xs rounded-lg bg-surface-75">{iconName}</p>
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
    </div>
  );
}
