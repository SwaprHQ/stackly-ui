"use client";

import { useTokenListContext } from "@/context/TokenListContext";
import {
  Divider,
  Modal,
  ModalBaseProps,
  ModalContent,
  ModalHeaderTitle
} from "@/ui";
import SearchBar from "@/ui/search/SearchBar";
import { TokenPickerList } from "./TokenPickerList";
import { TokenPickerCommonTokens } from "./TokenPickerCommonTokens";

export const TokenPicker = ({ isOpen, closeAction }: ModalBaseProps) => {
  const { tokenList } = useTokenListContext();

  return (
    <Modal closeAction={closeAction} isOpen={isOpen}>
      <ModalHeaderTitle closeAction={closeAction} title="Select a token" />
      <Divider className="my-1" />
      <ModalContent className="mt-3 px-0">
        <SearchBar
          className="text-em-low mx-6"
          placeholder="Search token name or paste address"
        />
        <TokenPickerCommonTokens />
        <TokenPickerList closeAction={closeAction} tokenList={tokenList} />
      </ModalContent>
    </Modal>
  );
};
