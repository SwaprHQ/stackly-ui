"use client";

import { BodyText, Modal, ModalContent, ModalHeaderTitle } from "@/ui";

interface TokenPickerProps {
  isOpen: boolean;
  closeAction: () => void;
}
export const TokenPicker = ({ isOpen, closeAction }: TokenPickerProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} close={closeAction}>
        <ModalHeaderTitle title="Select a token" closeAction={closeAction} />
        <ModalContent>
          <div className="space-y-4">
            <input
              type="search"
              placeholder="search token name or paste address"
              className="w-full p-2 bg-surface-75 rounded-xl"
            />
            <div className="py-3 space-y-2">
              <p className="text-xs font-semibold text-em-low">Common tokens</p>
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
                    onClick={closeAction}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100" />
                      <BodyText>{token}</BodyText>
                    </div>
                    <BodyText>0</BodyText>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
