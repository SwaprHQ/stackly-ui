"use client";

import { createContext, useContext, ReactNode, useState, useMemo } from "react";

export enum ModalId {
  CONFIRM_STACK = "confirmStack",
  STACK = "stack",
  TOKEN_PICKER = "tokenPicker",
}

export interface ModalContextProps {
  modalToOpen: ModalId | null;
  closeModal: () => void;
  openModal: (id: ModalId) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  modalToOpen: null,
  closeModal: () => {},
  openModal: (id: ModalId) => {},
});

export interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [modalToOpen, setModalToOpen] = useState<ModalId | null>(null);

  const modalContext = useMemo(
    () => ({
      modalToOpen,
      closeModal: () => setModalToOpen(null),
      openModal: (id: ModalId) => setModalToOpen(id),
    }),
    [modalToOpen]
  );

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
