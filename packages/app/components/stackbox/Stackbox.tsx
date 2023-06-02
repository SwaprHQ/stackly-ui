"use client";

import { Button, Icon } from "@/ui";
import { useState } from "react";
import { ConfirmStackModal } from "./ConfirmStackModal";
import { TokenPicker } from "@/components/token-picker/TokenPicker";

export const Stackbox = () => {
  const [isConfirmStackOpen, setConfirmStackIsOpen] = useState(false);
  const [isTokenPickerOpen, setTokenPickerIsOpen] = useState(false);

  const openConfirmStack = () => setConfirmStackIsOpen(true);
  const closeConfirmStack = () => setConfirmStackIsOpen(false);

  const openTokenPicker = () => setTokenPickerIsOpen(true);
  const closeTokenPicker = () => setTokenPickerIsOpen(false);

  return (
    <div>
      <div className="max-w-lg mx-auto my-32 bg-white shadow-2xl rounded-2xl">
        <div className="px-5 py-4 border shadow-lg border-surface-50 rounded-2xl">
          <div className="flex items-end justify-between pb-4 border-b border-surface-50">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-em-low">Deposit from</p>
              <Button action="secondary" size="sm" onClick={openTokenPicker}>
                select token
              </Button>
            </div>
            <div className="flex items-center justify-center p-2 w-14 bg-surface-50 rounded-2xl">
              <Icon name="arrow-left" className="rotate-180" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-em-low">To receive in</p>
              <Button action="secondary" size="sm" onClick={openTokenPicker}>
                select token
              </Button>
            </div>
          </div>
          <div className="py-2">
            <input
              type="number"
              placeholder="0.0"
              className="w-full py-3 text-4xl font-semibold outline-none"
            />
          </div>
        </div>
        <div className="px-5">
          <p className="py-12 mx-auto w-fit text-em-low">The stackbox™</p>
          <div className="pb-5">
            <Button width="full" onClick={openConfirmStack}>
              Stack Now
            </Button>
          </div>
        </div>
      </div>
      <TokenPicker isOpen={isTokenPickerOpen} closeAction={closeTokenPicker} />
      <ConfirmStackModal
        isOpen={isConfirmStackOpen}
        closeAction={closeConfirmStack}
      />
    </div>
  );
};
